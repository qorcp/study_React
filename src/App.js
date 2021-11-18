import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import Sub from './Sub';

// (1) return시에 하나의 DOM만 리턴할수 있다(2개이상의 div 사용 X)
// (2) 변수선언은 let 혹은 const
// (3) if문 사용 불가능 대신 3항연산자 사용 가능 (조건 ? 값(true) : 값(false))
// (4) 조건부 렌더링 (조건 && 값(true))
// (5) CSS 디자인 
//  - 내부파일
//  - 외부파일
//  - 라이브러리 사용 (Bootstrap, component-styled)


let a = 10; // 변수
const b = 20; // 상수

function App() {
  let c;
  console.log(1,c); // undefined

  // CSS 적용 실습
  const myStyle = {
    color:'red'
  };
  let b2 = [1,2,3,4];
  
  // 깊은 복사 실습
  let list = [1,2,3];

  // **useState 실습**
  // 랜더링 실행 = 상태값 변경
  //let number = 1; // 상태값 아님
  // 상태값임. 상태값은 UI에 동기화 되어있음.
  const [number, setNumber] = useState(0);   // *useState값이 number로 들어오고 number값은 setNumber로 변경된다. 즉, 현재 number 값은 = 0 
  const add = ()=>{
    setNumber(number + 1); // setNumber 실제 number값을 변경하는게 아니라 리엑트에게 number 값 변경 요청하는 것.
    console.log("add : ", number);
  };

  // useState 응용편
  console.log("app 실행됨");
  const [users, setUsers] = useState([
    {id:1, name:'홍길동'},
    {id:2, name:'임꺽정'},
    {id:3, name:'장보고'},
    {id:4, name:'이순신'}
  ]);
  const download = ()=>{
    // 기존데이터 세팅
    let sample = [
      {id:1, name:'홍길동'},
      {id:2, name:'임꺽정'},
      {id:3, name:'장보고'},
      {id:4, name:'이순신'}
    ];
    setUsers(sample); // 이경우 데이터는 users를 같더라도 reference가 다르기 때문에 rendering (한번 더 실행) 한다.
  }

  // useState 응용편 2
  console.log("app 실행됨2");
  let sample2 = [
    {id:1, name:'홍'},
    {id:2, name:'임'},
    {id:3, name:'장'},
    {id:4, name:'이'}
  ];
  const[num2, setNum2] = useState(5);
  const [users2, setUsers2] = useState(sample2); // 레퍼런스가 변경되어야지만 동작
  const download2 = ()=>{
    // setUsers2([...sample2, {id:5, name:'김'}]); // rendering (한번 더 실행)이 되는데 이때 있는데이터를 계속하기 
    setUsers2([...sample2, {id:num2, name:'김'}]); // rendering (한번 더 실행)이 되는데 이때 숫자를 올리면서 받고 싶을때
    setNum2(num2 + 1);
  }

  // **useEffect 실습**
  const [data, setData] = useState(0);
  const [search, setSearch] = useState(0);
  // 실행시점 : 
  // (1) App() 함수가 최초 실행될 때 ( 최초 마운트될 때. 즉 그림이 그려질때)
  // (2) 상태 변수가 변경될 때 (dependency list에 등록되어 있어야한다.)
  const download3 = () => {
    let downloadData = 5;
    setData(downloadData);
  }
  useEffect(() =>{
    console.log("useEffect 실행")
    download3();
  },[search]);

  // **useMemo 실습 => 메모라이제이션(기억)**
  const [list2, setList2] = useState([1,2,3,4]);
  const [str, setStr] = useState("합계");

  const getAddResult = () => {
    let sum = 0;
    list2.forEach((i)=>(sum += i));
    console.log("sum 함수 실행 됨: ", sum);
    return sum; // forEach를 사용하여 값을 표시하고 싶을때
  }

  const addResult = useMemo(()=>getAddResult(), [list2]); // 첫번째인자 = 기억하겠다는 뜻으로 이경우 함수, 두번째 = dependency 

  // **useRef(디자인) 실습 **
  // dom을 변경할때 사용
  const myRef = useRef(null); // 색변경시 사용
  const [list3, setList3] = useState([
    {id:1,name:"길동"}, 
    {id:2,name:"꺽정"}
  ]); // 리스트 변경시 사용

  return (
    <div>
      <div style={myStyle}>안녕 {a === 10 ? '10입니다' : '10이 아닙니다'}</div>
      <h1 className="box-style">해딩태그 {b === 20 && '20입니다'}</h1>
      <hr/>
      <input type='text'/>
      <div>{b2[0]}</div> 
      <div>{list.map((n)=><h1>{n}</h1>)}</div>
      <hr/>
      <h1>숫자 : {number}</h1>
      <button onClick={add}>더하기</button>
      <Sub/>
      <button onClick={download}>다운로드</button>
      {users.map((u) => <h1>{u.id}, {u.name}</h1>)}
      <button onClick={download2}>다운로드2</button>
      {users2.map((u2) => <h1>{u2.id}, {u2.name}</h1>)}
      <h1>data : {data}</h1>
      <button onClick={() => {setData(data + 1)}}>더하기</button>
      <hr/>
      <button onClick={() => {setSearch(2)}}>검색하기</button>
      <hr/>
      <button onClick={()=>{setStr("안녕");}}>문자변경</button>
      <button onClick={()=>{setList2([...list2, 10]);}}>리스트값 더하기</button>
      <div>{list2.map((i)=>(
        <h1>{i}</h1>
      ))}</div>
      <div>{str} : {addResult}</div>
      <hr/>
      <button onClick={()=> {
        console.log(myRef);
        console.log(myRef.current);
        myRef.current.style.backgroundColor='red';}}>색 변경</button>
      <div ref={myRef}>박스</div>
      {list3.map((user) => (<h1>{user.name}</h1>))}
    </div>
  );
}

export default App;
