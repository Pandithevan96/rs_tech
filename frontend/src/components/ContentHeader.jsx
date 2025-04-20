import React from "react";
import {
    FiUser as AvatarIcon,
    FiBell as NotificationIcon,
    FiSettings as SettingsIcon,
} from "react-icons/fi";
import Logo from "./Logo";

const ContentHeader = () => {
  return (
    <div className="d-flex flex-column flex-md-row g-0">
      <div className="col-12 col-md-3 col-lg-2 border-end border-bottom-0 d-flex align-items-center">
        <Logo />
      </div>
      <div className="col-12 col-md-9 col-lg-10 border-bottom d-flex justify-content-end align-items-center"
        style={{
          height: "60px",
        }}>
        <div className="d-flex align-items-center gap-3 me-3">
          {/* Settings Icon - Perfect Circle */}
          <button
            className="btn p-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#e7e6e6",
            }}
          >
            <SettingsIcon className="text-dark" size={18} />
          </button>

          <button
            className="btn p-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#e7e6e6",
            }}
          >
            <NotificationIcon className="text-dark" size={18} />
          </button>

          {/* Avatar - Perfect Circle */}
          <button
            className="btn p-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#e7e6e6",
            }}
          >
            <AvatarIcon className="text-dark" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;