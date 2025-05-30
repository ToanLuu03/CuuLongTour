import Nav from "../../components/Nav/Nav";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import ChatBox from "../../components/ChaxBox/ChaxBox";
function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <div className="flex">
                {/* Sidebar */}
                <Nav collapsed={collapsed} setCollapsed={setCollapsed} />
                {/* Main Content Area with dynamic margin */}
                <div className="">
                    {/* Outlet renders the child route components */}
                    <Outlet context={{ collapsed }} />
                </div>
                <ChatBox />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
