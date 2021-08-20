import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import HomeComponent from './components/HomeComponent';
import SearchComponent from './components/SearchComponent';
import MovieComponent from './components/MovieComponent';



import { Col, Layout, Menu, Row } from 'antd';

const { Header, Content } = Layout;

function App() {
  return (
      <BrowserRouter>
        <Layout className="App">
          <Header style={{margin:0, padding: 0}}>
            <Row justify={"center"}>
              <Col sm={20} xs={20} lg={13}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[(window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : 'home']}>
              <Menu.Item key="home"><Link to='/'>Home</Link></Menu.Item>
              <Menu.Item key="movies"><Link to='/movies'>Movies</Link></Menu.Item>
              <Menu.Item key="search"><Link to='/search'>Search</Link></Menu.Item>
            </Menu>
            </Col>
            </Row>
          </Header>

          <Content>
            <Switch>
              <Route exact path="/" component={HomeComponent}></Route>
              <Route exact path="/movies" component={MovieComponent}></Route>
              <Route exact path="/search" component={SearchComponent}></Route>
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
  );
}

export default App;
