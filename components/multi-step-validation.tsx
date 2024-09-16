"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import clsx from "clsx";

interface TopicInterface {
  id: number;
  title: string;
}

const MultiStepValidation = () => {
  const [step, setStep] = useState<number>(1);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
  });
  const [selectionnedTopics, setSelectionnedTopics] = useState<
    TopicInterface[]
  >([]);
  return (
    <main className="w-full h-screen flex-col space-y-3 bg-[#121826] relative flex items-center  justify-center overflow-hidden ">
      {step === 1 ? (
        <FirstStep
          setStep={setStep}
          formdata={formdata}
          setFormdata={setFormdata}
        />
      ) : step === 2 ? (
        <SecondStep
          setStep={setStep}
          setSelectionnedTopics={setSelectionnedTopics}
          selectionnedTopics={selectionnedTopics}
        />
      ) : (
        step === 3 && (
          <FinalStep
            formdata={formdata}
            selectionnedTopics={selectionnedTopics}
          />
        )
      )}
      <BottomNavigation step={step} setStep={setStep} />
      <img
        alt="first-blur"
        src="/blur-radial.svg"
        className="absolute -top-96 -left-52"
      />
      <img
        alt="first-blur"
        src="/blur-radial.svg"
        className="absolute -bottom-96 -right-52"
      />
    </main>
  );
};

export default MultiStepValidation;

const FirstStep = ({
  setStep,
  formdata,
  setFormdata,
}: {
  setStep: (num: number) => void;
  formdata: {
    name: string;
    email: string;
  };
  setFormdata: (formdata: { name: string; email: string }) => void;
}) => {
  return (
    <div className="w-full mx-8 md:mx-0 md:w-[500px] h-[400px] bg-[#212936] border p-8 border-[#4D5562] rounded-lg">
      <h1 className="text-[#E5E7EB] font-bold text-[20px] ">Register</h1>

      <div className="mt-8 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-[#A1A1A9] text-[14px]">Name</p>
          <Input
            value={formdata.name}
            onChange={(e) => {
              setFormdata({
                ...formdata,
                name: e.target.value,
              });
            }}
            placeholder="enter your name"
            className="bg-transparent focus-visible:none focus-visible:ring-0 focus-visible:ring-offset-0 p-3 text-[#A1A1A9] border-[#4D5562] border-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-[#A1A1A9] text-[14px]">Email</p>
          <Input
            value={formdata.email}
            onChange={(e) => {
              setFormdata({
                ...formdata,
                email: e.target.value,
              });
            }}
            placeholder="enter your email"
            className="bg-transparent  focus-visible:none  focus-visible:ring-0 focus-visible:ring-offset-0 p-3 text-[#A1A1A9] border-[#4D5562] border-2"
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-center py-12">
        <Button
          onClick={() => setStep(2)}
          className="px-12 py-5 rounded-full bg-[#652CD1] mx-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const SecondStep = ({
  setStep,
  selectionnedTopics,
  setSelectionnedTopics,
}: {
  setStep: (num: number) => void;
  selectionnedTopics: TopicInterface[];
  setSelectionnedTopics: (topics: TopicInterface[]) => void;
}) => {
  const topics: TopicInterface[] = [
    {
      id: 1,
      title: "Software Development",
    },
    {
      id: 2,
      title: "User Experience",
    },
    {
      id: 3,
      title: "Graphic Design",
    },
  ];

  const addTopic = (topic: TopicInterface) => {
    const verified = selectionnedTopics.some((elem) => elem.id === topic.id);
    if (!verified) {
      const tab = [...selectionnedTopics];
      tab.push(topic);
      setSelectionnedTopics(tab);
      return;
    }

    const newTab = selectionnedTopics.filter((item) => item.id !== topic.id);
    setSelectionnedTopics(newTab);
  };
  return (
    <div className="w-full mx-8 md:mx-0 md:w-[500px] h-[400px] bg-[#212936] border p-8 border-[#4D5562] rounded-lg">
      <h1 className="text-[#E5E7EB] font-bold text-[20px] ">
        Which topics you are interested in?
      </h1>
      <div className="flex flex-col space-y-6 mt-6">
        {topics.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              addTopic(item);
            }}
            className={clsx(
              "border cursor-pointer  p-3 rounded-xl ",

              selectionnedTopics.some((elem) => elem.id === item.id)
                ? "border-[#845EEE] text-[#E5E7EB] bg-[#652CD1]"
                : "border-[#4D5562] text-[#A1A1A9] bg-[#394150] "
            )}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center py-12">
        <Button
          onClick={() => setStep(3)}
          className="px-12 py-5 rounded-full bg-[#652CD1] mx-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const BottomNavigation = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (num: number) => void;
}) => {
  return (
    <div>
      <div className="flex items-center space-x-6 mr-24 mt-4">
        <span className="text-[#4D5562] font-bold text-sm">
          Step {step} of 3
        </span>
        <div className="flex space-x-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              onClick={() => setStep(item)}
              className={clsx(
                "size-6  rounded-full cursor-pointer flex items-center justify-center",
                item === step ? "bg-[#845EEE]" : ""
              )}
            >
              <div
                className={clsx(
                  "size-3  rounded-full",
                  item === step ? "bg-[#652CD1]" : "bg-[#4D5562]"
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FinalStep = ({
  formdata,
  selectionnedTopics,
}: {
  formdata: {
    name: string;
    email: string;
  };
  selectionnedTopics: TopicInterface[];
}) => {
  return (
    <div className="w-full mx-8 md:mx-0 md:w-[500px] h-[400px] bg-[#212936] border p-8 border-[#4D5562] rounded-lg">
      <h1 className="text-[#E5E7EB] font-bold text-[20px] ">Summary</h1>
      <div className="mt-8 text-lg">
        <p>
          <span className="font-bold text-[#A1A1A9]">Name : </span>{" "}
          <span className="text-[#E5E7EB] font-bold ">{formdata.name}</span>
        </p>
        <p>
          <span className="font-bold text-[#A1A1A9]">Email : </span>{" "}
          <span className="text-[#E5E7EB] font-bold ">{formdata.email}</span>
        </p>
      </div>
      <div className="mt-8">
        <p className="text-[#A1A1A9] font-bold text-lg ">Topics</p>
        <ul className=" list-disc pl-8 pt-2 text-lg text-[#E5E7EB]">
          {selectionnedTopics.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
      <div className="w-full flex items-center justify-center py-12">
        <Button className="px-12 py-5 rounded-full bg-[#652CD1] mx-auto">
          Submit
        </Button>
      </div>
    </div>
  );
};
