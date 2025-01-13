import Nav from "../../components/Nav/Nav";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div>
            <div className="flex">
                {/* Sidebar */}
                <Nav collapsed={collapsed} setCollapsed={setCollapsed} />

                {/* Main Content Area with dynamic margin */}
                <div className="pt-2">
                    {/* Outlet renders the child route components */}
                    <Outlet context={{ collapsed }} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
