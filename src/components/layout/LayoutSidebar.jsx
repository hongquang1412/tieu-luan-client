import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Container, Row } from "reactstrap";
function Layout({ children }) {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Sidebar />
          {children}
        </Row>
      </Container>
    </>
  );
}

export default Layout;
