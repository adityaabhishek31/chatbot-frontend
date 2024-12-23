import React from "react";
import { TbMessageCircleUser } from "react-icons/tb";
import { MdOutlineElectricalServices } from "react-icons/md";
import styles from "./OserDemoLanding.module.css";
import oser from "../assets/img/oser.ai-removebg white.png"


const OserDemoLanding = () => {
    return (
        <div className={styles.oserDemoLanding}>
            <div className={styles.oserDemoLandingContainer}>
                <img src={oser} alt="Oser.ai" className={styles.oserDemoLandingLogo} />
                <div className={styles.oserDemoLandingContent}>
                    <div className={styles.oserDemoLandingLeft} onClick={() => window.open("/electrify-ev-chatbot", "_blank")}>
                        <MdOutlineElectricalServices className={styles.oserDemoLandingLeftIcon} />
                        <div className={styles.oserDemoLandingLeftHeader}>
                            <h1>Electrify Your Fleet</h1>
                        </div>
                        <div className={styles.oserDemoLandingLeftDescription}>
                            <p>
                                Empower your EV fleet with powerful tools. Forecast demand, optimize charging costs with dynamic pricing, and gain valuable insights into your energy consumption – all in one integrated platform.
                            </p>
                        </div>
                    </div>
                    <div className={styles.oserDemoLandingRight} onClick={() => window.open("/user-ev-assist-chatbot", "_blank")}>
                        <TbMessageCircleUser className={styles.oserDemoLandingRightIcon} />
                        <div className={styles.oserDemoLandingRightHeader}>
                            <h1>Charge Smart with EV Assist</h1>
                        </div>
                        <div className={styles.oserDemoLandingRightDescription}>
                            <p>
                                Oser.ai EV Assistant simplifies your electric vehicle journey. Easily schedule charging, locate nearby stations, anticipate peak charging times, access helpful resources, and enjoy a seamless EV experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OserDemoLanding