import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./dotnet.scss";
import axios from "../../../utils/api";
import api from "../../../utils/api";
import swal from "sweetalert";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#6666ff"}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="green"
      >{`Servers: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="red"
      >
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const [data, setData] = useState([]);
  const data1 = [
    { name: "Reserved", value: data.reserved },
    { name: "Vacant", value: data.vacant },
  ];

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    // const { data } = await api.get("dashboard1").then()
    const res = await api
      .get("dashboard1")
      .then((res) => {
        if (res.status === 200) {
          console.log("dotnet value ", res.data);
          setData(res.data);
        } else if (res.status === 202) {
          swal(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
          console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
          console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
  };
  return (
    <div className="Dotnet">
      <div className="">
        <p
          id="heading1"
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          Server details
        </p>
        {/* <MoreVertIcon fontSize="small" /> */}
      </div>
      <div>
        <ResponsiveContainer width="100%" height={300} maxHeight={"auto"}>
          <PieChart className="featuredChart">
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data1}
              // cx={400}
              // cy={200}
              innerRadius={80}
              outerRadius={100}
              fill="#bb9cf0"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
