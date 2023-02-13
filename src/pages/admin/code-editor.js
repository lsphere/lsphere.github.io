import Editor from "@monaco-editor/react";
import AdminLayout from "../../components/dashboard/admin-layout";

import { useRef, useState } from "react";
import { Row, Modal } from "react-bootstrap";
import ExecuteIcon from "../../icons/execute-icon";
import classNames from "classnames";
import { utils } from "../../public/utils";
import PanelGroup from "react-panelgroup";
import { languageOptions } from "../../constants/languageOptions";
import DownChevronIcon from "../../icons/downchevron-icon";
import LeftChevronIcon from "../../icons/leftchevron-icon";
import PlusCircleIcon from "../../icons/pluscircle-icon";
import CloseIcon from "../../icons/close-icon";
import EditIcon from "../../icons/edit-icon";
import TrashIcon from "../../icons/trash-icon";
import { toast, ToastContainer } from "react-toastify";
import JavaScriptIcon from "../../icons/javascript-icon";
import JavaIcon from "../../icons/java-icon";
import PHPIcon from "../../icons/php-icon";
import TypeScriptIcon from "../../icons/typescript-icon";
import { statuses } from "../../constants/statuses";
import { useLocation, useParams } from "react-router-dom";
import SaveIcon from "../../icons/save-icon";

function CodeEditor() {
  const { type } = useParams();
  const [codes, setCodes] = useState([]);
  const [compiling, setCompiling] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [codeToDisplay, setCodeToDisplay] = useState(-1);
  const [codeToAdd, setCodeToAdd] = useState({
    codeName: "",
    codeLanguage: languageOptions[0],
  });
  const [outputDetails, setOutputDetails] = useState(null);
  const [explanation, setExplanation] = useState(false);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [loadingCodeCompletion, setLoadingCodeCompletion] = useState(false);
  const [codeCompleteModal, setCompleteCodeModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [openedCodes, setOpenedCodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [codeToComplete, setCodeToComplete] = useState("");
  const [showFiles, setShowFiles] = useState(false);
  const [showAddFile, setShowAddFiles] = useState(false);
  const [codeDescription, setCodeDescription] = useState("");
  const editorRef = useRef();
  const completeCode = async () => {
    if (codeDescription.replace(/\s+/g, "") !== "") {
      setCompleteCodeModal(false);
      setCodeDescription("");
      await utils
        .codeCompletion({
          code: codeToDisplay.text,
          codeDescription: codeDescription,
          setLoadingCodeCompletion: setLoadingCodeCompletion,
          setCodeToComplete: setCodeToComplete,
        })
        .then((responsess) => {});
    } else {
      toast.error("Explanation is required", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  const explainCode = async () => {
    if (codeToDisplay.text.replace(/\s+/g, "") !== "") {
      await utils
        .explainCode({
          code: codeToDisplay.text,
          setExplanation: setExplanation,
          setLoading: setLoadingExplanation,
        })
        .then((responsess) => {});
    }
  };

  const handleMouseUp = () => {
    const selected = window.getSelection().toString();
    if (selected) {
      setCodeToComplete(selected);
    }
  };

  const appendCode = async ({ codeName, codeLanguage }) => {
    setLoadingCode(true);
    if (codeName.replace(/\s+/g, "") !== "") {
      const tempCodes = [...codes];
      let json = {
        id: tempCodes.length + 1,
        codeName: codeName,
        codeLanguage: codeLanguage,
        text: "",
        showFunctionalities: false,
      };
      tempCodes.push(json);
      setCodes(tempCodes);
      setCodeToDisplay(json);
      let tempOpenedCodes = [...openedCodes];
      tempOpenedCodes.push(json);
      setOpenedCodes(tempOpenedCodes);
      setCodeToAdd({
        codeName: "",
        codeLanguage: languageOptions[0],
      });
      setShowModal(false);
      setShowFiles(true);
    } else {
      toast.error("File name is required", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  const modifyCodeToDisplay = async (c) => {
    setLoadingCode(true);
    setCodeToDisplay(c);
    let tempOpenedCodes = [...openedCodes];
    let index = tempOpenedCodes.findIndex((code) => code.id === c.id);
    if (index < 0) {
      tempOpenedCodes.push(c);
      setOpenedCodes(tempOpenedCodes);
    }
  };
  const closeOpenedCode = async (id) => {
    setLoadingCode(true);
    let tempOpenedCodes = [...openedCodes];
    let index = tempOpenedCodes.findIndex((code) => code.id === id);
    if (index >= 0) {
      tempOpenedCodes.splice(index, 1);
      setOpenedCodes(tempOpenedCodes);

      if (tempOpenedCodes.length !== 0 && id === codeToDisplay.id) {
        setCodeToDisplay(tempOpenedCodes[0]);
      } else {
        setCodeToDisplay(-1);
      }
    }
  };
  const modifyCodeText = (e) => {
    if (!loadingCode) {
      let tempCodeToDisplay = { ...codeToDisplay };
      const tempCodes = [...codes];
      let index = tempCodes.findIndex((c) => c.id === codeToDisplay.id);
      tempCodes[index].text = e;
      tempCodeToDisplay.text = e;
      setCodes(tempCodes);
      setCodeToDisplay(tempCodeToDisplay);
    }
  };

  const handleCodeCompile = async () => {
    if (codeToDisplay.text.replace(/\s+/g, "") !== "") {
      await utils
        .handleCompile({
          code: codeToDisplay.text,
          setOutputDetails: setOutputDetails,
          setCompiling: setCompiling,
          codeName: codeToDisplay.codeName,
          language_id: codeToDisplay.codeLanguage.id,
        })
        .then((responsess) => {});
    }
  };
  const modifyCodeToAdd = (key, value) => {
    let tempCodeToAdd = { ...codeToAdd };
    tempCodeToAdd[key] = value;
    setCodeToAdd(tempCodeToAdd);
  };
  const modal = (
    <Modal show={showModal}>
      <Modal.Body>
        <form className="d-flex flex-column">
          <div
            onClick={() => {
              setShowModal(false);
              setCodeToAdd({
                codeName: "",
                codeLanguage: "",
              });
            }}
            className="w-100 d-flex justify-content-end close-icon"
          >
            <CloseIcon />
          </div>
          <div className="d-flex flex-column mt-3">
            <input
              type="text"
              required
              className="mt-2"
              placeholder="Folder Name"
              onChange={(e) => modifyCodeToAdd("codeName", e.target.value)}
            />
            <select
              className="mt-2"
              onChange={(e) =>
                modifyCodeToAdd("codeLanguage", JSON.parse(e.target.value))
              }
            >
              {languageOptions.map((l, index) => {
                return <option value={JSON.stringify(l)}>{l.name}</option>;
              })}
            </select>
          </div>
          {codeToAdd.codeLanguage.id === 62 && (
            <div>Make sure your class is named Main in your code</div>
          )}
          <input
            type="submit"
            value={"Save"}
            className="submit-add-code-btn mt-2"
            onClick={(e) => {
              if (codeToAdd.codeName.replace(/\s+/g, "") !== "") {
                e.preventDefault();
              }
              appendCode({
                codeName: codeToAdd.codeName,
                codeLanguage: codeToAdd.codeLanguage,
              }).then(() => {
                setLoadingCode(false);
              });
            }}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
  const modifyFileFunctionality = (id) => {
    const tempCodes = [...codes];
    let index = tempCodes.findIndex((c) => c.id === id);
    tempCodes[index].showFunctionalities =
      !tempCodes[index].showFunctionalities;
    setCodes(tempCodes);
  };

  const deleteFile = (id) => {
    closeOpenedCode(id).then(() => {
      const tempCodes = [...codes];
      let index = tempCodes.findIndex((c) => c.id === id);
      tempCodes.splice(index, 1);
      setCodes(tempCodes);
      if (codeToDisplay.id === id) {
        if (tempCodes.length !== 0) {
          setCodeToDisplay(tempCodes[0]);
        } else {
          setCodeToDisplay(-1);
        }
      }
      setLoadingCode(false);
    });
  };
  const completeModal = (
    <Modal show={codeCompleteModal}>
      <Modal.Body>
        <form className="d-flex flex-column">
          <div
            onClick={() => {
              setCompleteCodeModal(false);
              setCodeDescription("");
            }}
            className="w-100 d-flex justify-content-end close-icon"
          >
            <CloseIcon />
          </div>
          <div className="d-flex flex-column mt-3">
            <input
              type="text"
              required
              className="mt-2"
              value={codeDescription}
              placeholder="Explain what your code is doing"
              onChange={(e) => setCodeDescription(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value={"Submit"}
            className="submit-add-code-btn mt-2"
            onClick={(e) => {
              if (codeDescription.replace(/\s+/g, "") !== "") {
                e.preventDefault();
              }
              completeCode();
            }}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
  return (
    <>
      <ToastContainer />
      {completeModal}
      {modal}

      <Row
        className="admin-coding"
        style={{ padding: 0, height: "100vh", position: "relative" }}
      >
        <PanelGroup
          direction="row"
          borderColor="grey"
          panelWidths={[
            { size: 200, minSize: 0, resize: "dynamic" },
            { minSize: 100, resize: "stretch" },
          ]}
        >
          <div className="100vh w-100 admin-code-content">
            {/* <button onClick={() => handleFormat()}>format</button> */}

            <div className="d-flex flex-column admin-codes">
              <div
                onMouseEnter={() => setShowAddFiles(true)}
                onMouseLeave={() => setShowAddFiles(false)}
                className="d-flex admin-code-item align-items-center justify-content-between"
              >
                <div
                  onClick={() => setShowFiles(!showFiles)}
                  className="d-flex align-items-center w-75"
                  style={{ height: "30px" }}
                >
                  <div className="d-flex align-items-center">
                    {showFiles ? <DownChevronIcon /> : <LeftChevronIcon />}
                  </div>
                  <div>FILES</div>
                </div>
                {showAddFile && (
                  <div
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <PlusCircleIcon />
                  </div>
                )}
              </div>
              <div className="admin-files-content">
                {showFiles &&
                  codes.map((c, i) => {
                    return (
                      <div
                        onMouseEnter={() => modifyFileFunctionality(c.id)}
                        onMouseLeave={() => modifyFileFunctionality(c.id)}
                        className={classNames(
                          "admin-code-file d-flex justify-content-between",
                          {
                            "selected-admin-code-file":
                              c.id === codeToDisplay.id,
                          }
                        )}
                        key={"code" + i}
                        onClick={() => {
                          modifyCodeToDisplay(c).then(() => {
                            setLoadingCode(false);
                          });
                        }}
                      >
                        <div className="d-flex align-items-center">
                          {c.codeLanguage.extension === ".js" ? (
                            <JavaScriptIcon />
                          ) : c.codeLanguage.extension === ".java" ? (
                            <JavaIcon />
                          ) : c.codeLanguage.extension === ".php" ? (
                            <PHPIcon />
                          ) : c.codeLanguage.extension === ".ts" ? (
                            <TypeScriptIcon />
                          ) : (
                            <></>
                          )}
                          <div className="mx-2">
                            {c.codeName + "" + c.codeLanguage.extension}
                          </div>
                        </div>
                        {c.showFunctionalities && (
                          <div className="admin-code-file-functionalities d-flex">
                            <div>
                              <EditIcon />
                            </div>
                            <div onClick={() => deleteFile(c.id)}>
                              <TrashIcon />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column w-100">
            <div
              style={{ height: "30px" }}
              className="admin-code-operations d-flex justify-content-between"
            >
              <div
                onClick={() => {
                  if (codeToDisplay !== -1) {
                    if (type === "ASSIGNMENT") {
                      if (!compiling) {
                        handleCodeCompile();
                      }
                    }
                    if (type === "EXPLAIN") {
                      explainCode();
                    }
                    if (type === "COMPLETE") {
                      setCompleteCodeModal(true);
                    }
                  }
                }}
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center admin-code-operation"
              >
                <ExecuteIcon />
                <div className="mx-2">
                  {type === "ASSIGNMENT"
                    ? "Execute"
                    : type === "EXPLAIN"
                    ? "Explain"
                    : type === "COMPLETE"
                    ? "Complete"
                    : ""}
                </div>
              </div>
              {type === "ASSIGNMENT" && codes.length !== 0 && (
                <div
                  style={{ cursor: "pointer" }}
                  className="d-flex align-items-center admin-code-operation"
                >
                  <div>
                    {" "}
                    <SaveIcon />
                  </div>
                  <div className="mx-2">Save</div>
                </div>
              )}
            </div>
            <PanelGroup
              direction="column"
              borderColor="grey"
              panelWidths={[
                { size: 200, minSize: 0, resize: "stretch" },
                { size: 200, minSize: 0, resize: "dynamic" },
              ]}
            >
              {codeToDisplay === -1 ? (
                <div className="admin-code-editor d-flex flex-column justify-content-center align-items-center">
                  <div>
                    {codes.length === 0 ? "Get Started" : "Genetate new code"}
                  </div>
                  <button
                    className="admin-new-code-btn"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    New Program
                  </button>
                </div>
              ) : (
                <div className="w-100 ">
                  <div className="w-100 d-flex justify-content-between">
                    <div className="w-100">
                      {openedCodes.length !== 0 && (
                        <div className="d-flex  opened-codes">
                          {openedCodes.map((c) => {
                            return (
                              <div
                                className={classNames(
                                  "opened-code-div d-flex justify-content-between",
                                  {
                                    "selected-opened-code":
                                      codeToDisplay.id === c.id,
                                  }
                                )}
                              >
                                <div
                                  className="w-100 opened-code-div-name"
                                  onClick={() => {
                                    modifyCodeToDisplay(c).then(() => {
                                      setLoadingCode(false);
                                    });
                                  }}
                                >
                                  {c.codeName + "" + c.codeLanguage.extension}
                                </div>
                                <div
                                  onClick={() =>
                                    closeOpenedCode(c.id).then(() => {
                                      setLoadingCode(false);
                                    })
                                  }
                                >
                                  <CloseIcon />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {loadingCode ? (
                    <div>loading...</div>
                  ) : (
                    <Editor
                      height="100vh"
                      width={"100%"}
                      language={codeToDisplay.codeLanguage.value}
                      value={codeToDisplay.text}
                      defaultValue=""
                      onChange={(e) => {
                        modifyCodeText(e);
                      }}
                    />
                  )}
                </div>
              )}

              <div className={classNames("code-output", {})}>
                {type === "ASSIGNMENT"
                  ? "Output"
                  : type === "EXPLAIN"
                  ? "Explanation"
                  : type === "COMPLETE"
                  ? "Completion"
                  : ""}
                <div className={classNames("admin-code-output", {})}>
                  {type === "ASSIGNMENT" ? (
                    <>
                      <div
                        className={classNames(
                          outputDetails !== null
                            ? "code-" +
                                statuses.filter(
                                  (s) => s.id === outputDetails.status.id
                                )[0].type
                            : "",
                          {}
                        )}
                      >
                        {!compiling &&
                        outputDetails &&
                        outputDetails.status !== null
                          ? outputDetails.status.description
                          : null}
                      </div>
                      {compiling
                        ? "Compiling..."
                        : outputDetails && atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}

                      <div className="code-error">
                        {!compiling &&
                        outputDetails &&
                        outputDetails.stderr !== null
                          ? `${atob(outputDetails.stderr)}`
                          : null}
                      </div>
                    </>
                  ) : type === "EXPLAIN" ? (
                    <div className="d-flex flex-column">
                      {loadingExplanation ? "Processing" : explanation}
                    </div>
                  ) : (
                    <div className="d-flex flex-column">
                      {loadingCodeCompletion ? "Processing" : codeToComplete}
                    </div>
                  )}
                </div>
              </div>
            </PanelGroup>
          </div>
        </PanelGroup>
      </Row>
    </>
  );
}

export default CodeEditor;
