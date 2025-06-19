import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
	return (
		<>
			<Button onClick={()=>console.log(123)}>Button</Button>
			<Button appearance='big'>Button</Button>
			<Input placeholder='Email' />
		</>
	);
}

export default App;
