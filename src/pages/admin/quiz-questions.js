import classNames from "classnames";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import StepWizard from "../../components/step-wizard";
import Timer from "../../components/timer";
import CloseIcon from "../../icons/close-icon";
import PlusCircleIcon from "../../icons/pluscircle-icon";
import TrashIcon from "../../icons/trash-icon";
import { utils } from "../../public/utils";

function QuizQuestions() {
  const [canNextStep, setCanNextStep] = useState(false);
  const [languageChosen, setLanguageChosen] = useState("");
  const [filtersChosen, setFiltersChosen] = useState([]);
  const [languageFilters, setLanguageFilters] = useState({
    java: [
      {
        id: 1,
        value: "Classes",
        new: false,
      },
      {
        id: 2,
        value: "Access Modifiers",
        new: false,
      },
    ],
    reactjs: [
      {
        id: 1,
        value: "Hooks",
        new: false,
      },
      {
        id: 2,
        value: "Context",
        new: false,
      },
      {
        id: 3,
        value: "Props",
        new: false,
      },
    ],
  });
  const [questions, setQuestions] = useState([]);
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]);
  const [codingQuestion, setCodingQuestion] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filterAddedName, setFilterAddedName] = useState("");
  const [addFilterModal, setAddFilterModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [resumeTimer, setResumeTimer] = useState(true);
  const addFilter = () => {
    if (filterAddedName.replace(/\s+/g, "") !== "") {
      if (
        languageFilters[languageChosen].filter(
          (fl) =>
            fl.value.toLowerCase() ===
            filterAddedName.replace(/\s+/g, "").toLowerCase()
        ).length === 0
      ) {
        let tempLanguageFilters = {...languageFilters};
        let filterID =
        tempLanguageFilters[languageChosen][
            tempLanguageFilters[languageChosen].length - 1
          ].id + 1;
        let addedFilter = {
          id: filterID,
          value: filterAddedName,
          new:true
        };
        tempLanguageFilters[languageChosen].push(addedFilter);
        setLanguageFilters(tempLanguageFilters);
        setFiltersChosen((filters) => [...filters, addedFilter]);
        setAddFilterModal(false)
      } else {
        toast.error("Filter already found", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Filter Name is required", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  console.log(filtersChosen)
  const modal = (
    <Modal show={addFilterModal}>
      <ModalBody>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-end">
            <div
            className="quiz-questions-add-filter-modal-close-icon"
              onClick={() => {
                setAddFilterModal(false);
                setFilterAddedName("");
              }}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="mt-3">
            <div>Add the name of the filter</div>
            <input
              type="text"
              placeholder="Filter name"
              className="mt-3"
              onChange={(e) => setFilterAddedName(e.target.value)}
            />
          </div>
          <button onClick={() => addFilter()}>Submit</button>
        </div>
      </ModalBody>
    </Modal>
  );
  useEffect(() => {
    if (submitted) {
      if (!loading) {
        setResumeTimer(true);
      } else {
        setResumeTimer(false);
      }
    }
  }, [loading]);
  const getQuestions = async () => {
    setSubmitted(true);
    setLoading(true);

    utils.getQuestions({
      language: languageChosen,
      filters: filtersChosen.map((obj) => obj.value).join(", "),
      numberOfQuestions: 1,
      allQuestions: allQuestions,

      setAllQuestions: setAllQuestions,
      setLoading: setLoading,
    });
  };

  function pushFilter(filterID) {
    let filter = languageFilters[languageChosen].filter(
      (f) => f.id === filterID
    )[0];
    setFiltersChosen((filters) => [...filters, filter]);
  }
  function deleteFilter(f) {
    let index = filtersChosen.findIndex((fl) => fl.id === f.id);
    let tempFiltersChosen = [...filtersChosen];
    tempFiltersChosen.splice(index, 1);
    setFiltersChosen(tempFiltersChosen);
  }
  const step1Component = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="quiz-questions-title">
        Choose the language you would like to practice
      </div>
      <select
        defaultValue={""}
        className="mt-3"
        onChange={(e) => {
          setLanguageChosen(e.target.value);
          setCanNextStep(true);
          setFiltersChosen([]);
        }}
      >
        <option disabled value="">
          Select a language
        </option>

        <option value="reactjs">ReactJS</option>
        <option value="java">JAVA</option>
      </select>
    </div>
  );
  const step2Component = languageChosen !== "" && (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="quiz-questions-title">
        Here are some recommended filters
      </div>
      <div className="d-flex justify-content-center" style={{ width:"500px" }}>
        {filtersChosen.length !==
          languageFilters[languageChosen].length && (
          <select
            value=""
            onChange={(e) => pushFilter(parseInt(e.target.value))}
          >
            <option disabled selected value="">
              Select a filter
            </option>
            {languageFilters[languageChosen].map((f, index) => {
              return (
                filtersChosen.findIndex((fl) => fl.id === f.id) < 0 && (
                  <option value={f.id}>{f.value}</option>
                )
              );
            })}
          </select>
        )}
        <div
          className="mx-2 d-flex align-items-center quiz-questions-add-filter"
          onClick={() => setAddFilterModal(true)}
        >
          Add Filter <PlusCircleIcon />
        </div>
      </div>
      <div
        style={{ width: "400px" }}
        className="d-flex flex-wrap justify-content-center mt-3"
      >
        {filtersChosen.map((fc) => {
          return (
            <div className="d-flex quiz-question-filter-chosen">
              <div>{fc.value}</div>
              <div onClick={() => deleteFilter(fc)}>
                <TrashIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  const step3Component = (
    <div>
      <div className="quiz-questions-title">
        Language Chosen : {languageChosen}
      </div>
      <div className="quiz-questions-title">
        Filters Applied : {filtersChosen.map((obj) => obj.value).join(", ")}
      </div>
      <button
        className="btn-fill pull-right btn btn-info"
        onClick={() => {
          setSubmitted(true);
          getQuestions().then(() => {
            setQuestionIndex(0);
          });
        }}
      >
        Submit
      </button>
    </div>
  );
  return (
    <div
      className={classNames("quiz-questions-wrapper", {
        centered: submitted === false,
      })}
    >
      <ToastContainer />
      {modal}
      {!submitted && (
        <StepWizard
          canNextStep={canNextStep}
          setCanNextStep={setCanNextStep}
          steps={[
            {
              title: "Step1",
              component: step1Component,
              required: true,
            },
            {
              title: "Step2",
              required: false,
              component: step2Component,
            },
            {
              title: "Step3",
              required: false,
              component: step3Component,
            },
          ]}
        />
      )}
      {submitted && (
        <div className="d-flex justify-content-between">
          <div>LearnSphere Quiz</div>
          {!loading && <div>Total Questions {allQuestions.length}</div>}
          <Timer resumeTimer={resumeTimer} />
        </div>
      )}

      <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
        {submitted ? (
          <div className="quiz-question-wrapper">
            {loading
              ? "Loading..."
              : allQuestions.map((q, index) => {
                  return (
                    questionIndex === index &&
                    (q.type === "MCQ" ? (
                      <div>
                        <h4> {q.question}</h4>
                        {q.answers.split(",").map((a, answerIndex) => {
                          return (
                            <div className="d-flex">
                              <input
                                name={"question" + index + "answers"}
                                type="radio"
                              />
                              {a}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="d-flex flex-column">
                        <h4> {q.value}</h4>
                        <textarea rows={4} cols={10} />
                      </div>
                    ))
                  );
                })}
          </div>
        ) : (
          <></>
        )}
        {submitted && (
          <div className="d-flex justify-content-center w-100 mt-4">
            <button
              disabled={questionIndex === 0 || loading}
              className={classNames(
                "btn-fill pull-right btn btn-info quiz-questions-previous-btn",
                {
                  "quiz-questions-previous-btn-disabled": questionIndex === 0,
                }
              )}
              onClick={() => {
                if (questionIndex !== 0 && !loading) {
                  setQuestionIndex(questionIndex - 1);
                }
              }}
            >
              Previous
            </button>
            <div className="d-flex flex-wrap align-items-center">
              {allQuestions.map((q, index) => {
                return (
                  <div
                    className={classNames("mx-1 quiz-questions-index", {
                      "quiz-questions-index-selected": questionIndex === index,
                    })}
                    onClick={() => {
                      if (!loading) {
                        setQuestionIndex(index);
                      }
                    }}
                  >
                    {"Q" + (index + 1)}
                  </div>
                );
              })}
            </div>
            <button
              disabled={loading}
              className="btn-fill pull-right btn btn-info mx-2"
              onClick={() => {
                if (!loading) {
                  let tempQuestionIndex = questionIndex + 1;
                  if (tempQuestionIndex < allQuestions.length) {
                    setQuestionIndex(questionIndex + 1);
                  } else {
                    getQuestions().then(() => {
                      setQuestionIndex(questionIndex + 1);
                    });
                  }
                }
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizQuestions;
