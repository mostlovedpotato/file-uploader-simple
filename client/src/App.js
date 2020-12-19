import "./App.css";
import Fileupload from './components/Fileupload'
function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center md-4">
      <i className="	fa fa-files-o"></i>React File Upload</h4>
      <Fileupload/>
    </div>
  );
}

export default App;
