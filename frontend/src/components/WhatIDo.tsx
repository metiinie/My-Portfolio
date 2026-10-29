import { useState } from "react";
import "./styles/WhatIDo.css";
import { config } from "../config";

interface WhatIDoItem {
  num: string;
  title: string;
  description: string;
  details: string;
  tools: string[];
}

const WhatIDo = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const items: WhatIDoItem[] = config.whatIDo;

  return (
    <div className="whatIDO">
      <div className="what-box what-title-box">
        <h2 className="what-title">
          <span className="what-title-line">
            W<span className="hat-h2">HAT</span>
          </span>
          <span className="what-title-line">
            I<span className="do-h2"> DO</span>
          </span>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          {items.map((item, index) => {
            const isActive = activeIdx === index;
            return (
              <div
                key={index}
                className={`what-content ${isActive ? "what-content-active" : ""}`}
                onMouseEnter={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(activeIdx === index ? -1 : index)}
              >
                <div className="what-corner"></div>

                <div className="what-content-header">
                  <span className="what-num">{item.num}</span>
                  <div className="what-title-wrap">
                    <h3>{item.title}</h3>
                    <h4>{item.description}</h4>
                  </div>
                  <div className="what-arrow"></div>
                </div>

                <div className="what-content-details">
                  <p>{item.details}</p>
                  <h5>Skillset &amp; tools</h5>
                  <div className="what-content-flex">
                    {item.tools.map((tool, tIdx) => (
                      <div key={tIdx} className="what-tags">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
