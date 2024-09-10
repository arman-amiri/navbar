"use client";
import React, { useState } from "react";
import DatePicker from "../_components/date-picker/Datepicker";
import TimePicker from "../_components/time-picker/TimePicker";
import DateTimePicker from "../_components/date-time-picker/DateTimePicker";

export default function Page() {
  const [value, setValue] = useState("14030101");
  const selectDate = (v: any) => {
    console.log(v, "selectDate");
  };
  console.log(value);
  return (
    <div className="flex">
      <section className="flex flex-auto justify-center items-center min-h-screen	bg-slate-400">
        <DatePicker
          isShamsi={true}
          placeholder="تاریخ ارسال"
          oldDate={value}
          onSelectDate={selectDate}
        />
      </section>
      {/* <section>
        <TimePicker oldDate="" placeholder="" onSelectDate={() => {}} />
      </section> */}
      {/* <section>
        <DateTimePicker
          placeholder="تاریخ ارسال"
          oldDate={value}
          onSelectDate={selectDate}
        />
      </section> */}
    </div>
  );
}
