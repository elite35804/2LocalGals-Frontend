import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page/dashboard/Home";
import Login from "../page/auth/Login";
import Startjob from "@/components/sujjestion/Startjob";
import UpdateUnavailability from "@/page/dashboard/UpdateUnavailability";
import UpdateProfilePicture from "@/page/dashboard/UpdateProfilePicture";
import UpdateAddress from "@/page/dashboard/UpdateAddress";
import Slider from "@/components/sujjestion/Slider";
import Subpage from "@/components/sujjestion/Subpage";
import Finish from "@/components/sujjestion/Finish";
import PageLayout from "@/components/PageLayout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schedule_detail/:id" element={<Subpage />} />
          <Route path="/Startjob/:id" element={<Startjob />} />
          <Route path="/finish/:id" element={<Finish />} />
          <Route path="/walk_through" element={<Slider />} />
          <Route
            path="/update_unavailability"
            element={<UpdateUnavailability />}
          />
          <Route
            path="/update_profile_picture"
            element={<UpdateProfilePicture />}
          />
          <Route path="/update_address" element={<UpdateAddress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
