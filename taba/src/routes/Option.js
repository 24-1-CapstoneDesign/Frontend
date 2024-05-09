import LeftNav from "../components/LeftNav";
import Table from "../components/Table";
import NavBar from "../components/NavBar";

export default function Option() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <LeftNav />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}
