import React, { useState, useEffect } from "react";
import "./add-subtitle-data.css";
import crossButton from "../../assests/images/delete-cross.png";
const AddSubtitle = (props) => {
    const [subTitleData, setSubTitleData] = useState([
        { startTimestamp: "", endTimestamp: "", subTitle: "", showsubtitle: false },
    ]);
    const handleChange = (index, field, value) => {
        const updatedSubtitleData = subTitleData.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setSubTitleData(updatedSubtitleData);
    };
    const addMoreSubtitle = () => {
        setSubTitleData([...subTitleData, { startTimestamp: "", endTimestamp: "", subTitle: "", showsubtitle: false }]);
    };
    const removeSubtitle = (indexToRemove) => {
        setSubTitleData(subTitleData.filter((_, index) => index !== indexToRemove));
    };
    useEffect(() => {
        let currentSubtitle;
        const updatedSubTitles = subTitleData.map((item) => {
            if (
                props.currentTime >= parseFloat(item.startTimestamp) &&
                props.currentTime <= parseFloat(item.endTimestamp)
            ) {
                currentSubtitle = item.subTitle;
                return { ...item, showsubtitle: true };
            } else {
                return { ...item, showsubtitle: false };
            }
        });
        props.handTimestamp(currentSubtitle);
        setSubTitleData(updatedSubTitles);
    }, [props.currentTime]);

    return (
        <div className="main">
            {subTitleData.map((item, index) => (
                <div className="main-div" key={index}>
                    <div className="remove-button">
                        <button onClick={() => removeSubtitle(index)}>
                            <img height={8} src={crossButton} />
                        </button>
                    </div>
                    <textarea
                        id="captions"
                        className="subtitle-text"
                        value={item.subTitle}
                        onChange={(e) => handleChange(index, "subTitle", e.target.value)}
                        placeholder="Enter subtitle"
                        required
                    ></textarea>
                    <div className="timestamp">
                        <input
                            type="number"
                            value={item.startTimestamp}
                            onChange={(e) => handleChange(index, "startTimestamp", e.target.value)}
                            placeholder="Start timestamp in Seconds"
                            required
                        />
                        <input
                            type="number"
                            value={item.endTimestamp}
                            onChange={(e) => handleChange(index, "endTimestamp", e.target.value)}
                            placeholder="End timestamp in Seconds"
                            required
                        />
                    </div>
                </div>
            ))}
            <button onClick={addMoreSubtitle} className="add-sub-title">
                Add More Subtitles
            </button>
        </div>
    );
};

export default AddSubtitle;
