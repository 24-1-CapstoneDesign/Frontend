import LeftNav from "../components/LeftNav";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";
import Table from "../components/Table";

export default function Statics() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <LeftNav />
      </div>
      <div>
        <Calendar />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}
