import logo from './logo.svg';
import './App.css';

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

  const myStyle = {
    color:'red'
  };

  let b2 = [1,2,3,4];
  
  let list = [1,2,3];

  return (
    <div>
      <div style={myStyle}>안녕 {a === 10 ? '10입니다' : '10이 아닙니다'}</div>
      <h1 className="box-style">해딩태그 {b === 20 && '20입니다'}</h1>
      <hr/>
      <input type='text'/>
      <div>{b2[0]}</div> 
      <div>{list.map((n)=><h1>{n}</h1>)}</div>
    </div>
  );
}

export default App;
