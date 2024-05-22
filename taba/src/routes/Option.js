import LeftNav from "../components/LeftNav";
import UserTable from "../components/UserTable";
import NavBar from "../components/NavBar";
import OptionGraph from "../components/OptionGraph";

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
        <UserTable />
      </div>
      <div>
        <OptionGraph />
      </div>
    </div>
  );
}
