import axios from "axios";

const API_KEY = "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";
const API_ENDPOINT = "https://api.openai.com/v1/completions";

const checkStatus = async (token) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "0d8380355fmshf9f0c7d839a831ap18730bjsn17c7a2d424eb",
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(token);
      }, 2000);
    } else {
      return response;
    }
  } catch (err) {
    return err;
  }
};
const handleCompile = async ({
  codeName,
  code,
  setOutputDetails,
  setCompiling,
  language_id,
}) => {
  setCompiling(true);
  const formData = {
    language_id: language_id,
    // encode source code in base64

    source_code: btoa(code),
    stdin: btoa(""),
  };
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "0d8380355fmshf9f0c7d839a831ap18730bjsn17c7a2d424eb",
    },
    data: formData,
  };

  axios
    .request(options)
    .then(function (response) {
      const token = response.data.token;
      checkStatus(token).then((res) => {
        setCompiling(false);
        return setOutputDetails(res.data);
      });
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      return error;
    });
};
const codeCompletion = async ({
  codeDescription,
  code,
  setLoadingCodeCompletion,
  setCodeToComplete,
}) => {
  setLoadingCodeCompletion(true);
  axios({
    url: API_ENDPOINT,
    data: {
      model: "code-davinci-002",
      prompt: `${codeDescription}. I just want a neat js code without description. Here's my code so far:\n\n${code}`,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    headers: {
      Authorization: "Bearer " + API_KEY,
    },
    method: "POST",
  }).then((response) => {
    setLoadingCodeCompletion(false);
    setCodeToComplete(response.data.choices[0].text);
  });
};

const extractBrackets = (str) => {
  const brackets = str.match(/\[\[(.*?)\]\]/g);
  return brackets ? brackets.map((match) => match.slice(2, -2)) : [];
};

const extractAngleBrackets = (str) => {
  const angleBrackets = str.match(/<<(.*?)>>/g);
  return angleBrackets ? angleBrackets.map((match) => match.slice(2, -2)) : [];
};

const extractHashes = (str) => {
  const hashes = str.match(/##(.*?)##/g);
  return hashes ? hashes.map((match) => match.slice(2, -2)) : [];
};
const getQuestions = async ({
  language,
  filters,

  numberOfQuestions,
  allQuestions,
  setAllQuestions,
  setLoading,
}) => {
  let loadingQuestion = false;
  let tempAllQuestions = [...allQuestions];
  let type = "MCQ";
  let random = Math.random();
  if (random < 0.5) {
    type = "SUB";
  }
  if (!loadingQuestion) {
    await axios({
      url: API_ENDPOINT,
      data: {
        model: "text-davinci-003",
        prompt:
          type === "SUB"
            ? "I want from you to ask me a quesyion about anything on " +
              language +
              (filters !== ""
                ? " such as " + filters
                : "" +
                  " Every time give me different question about the topics I mentioned. Start your question with What")
            : "I want a " +
              language +
              " question  " +
              (filters !== "" ? " about " + filters : "") +
              " with four possible answers and the correct answer at the end.  Question should be between [[]]. Possible Answers should be between <<>> separated by commas. Correct answer should be between two ##. All on the same line. Every time give me different question about the topics I mentioned. Start directly with questions without saying anything",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      headers: {
        Authorization: "Bearer " + API_KEY,
      },
      method: "POST",
    }).then((response) => {
      let question = response.data.choices[0].text + "";

      if (type === "SUB") {
        let IndexOfWhat = (response.data.choices[0].text + "").indexOf("What");
        let QuestionFound =
          tempAllQuestions.filter(
            (q) =>
              q.type === "SUB" && q.value === question.substring(IndexOfWhat)
          ).length !== 0;
        if (!QuestionFound) {
          tempAllQuestions.push({
            type: "SUB",
            value: question.substring(IndexOfWhat),
          });
          setAllQuestions(tempAllQuestions);

          setLoading(false);
          loadingQuestion = false;
        } else {
          loadingQuestion = false;

          getQuestions({
            type: type,
            language: language,
            filters: filters,

            numberOfQuestions: numberOfQuestions,
            allQuestions: allQuestions,
            setAllQuestions: setAllQuestions,
            setLoading: setLoading,
          });
        }
      } else {
        let mainQuestion = extractBrackets(question)[0];

        if (mainQuestion) {
          let QuestionFound =
            tempAllQuestions.filter(
              (q) => q.type === "MCQ" && q.question === mainQuestion
            ).length !== 0;
          let possibleAnswers = extractAngleBrackets(question)[0];
          let correctAnswer = extractHashes(question)[0];
          if (
            possibleAnswers !== null &&
            possibleAnswers !== "" &&
            correctAnswer !== null &&
            correctAnswer !== "" &&
            !QuestionFound
          ) {
            if (possibleAnswers.split(",").length === 4) {
              tempAllQuestions.push({
                type: "MCQ",
                question: mainQuestion,

                answers: possibleAnswers,
                correctAnswer: correctAnswer,
              });
              setAllQuestions(tempAllQuestions);
              setLoading(false);

              loadingQuestion = false;
            } else {
              loadingQuestion = false;

              getQuestions({
                type: type,
                language: language,
                filters: filters,

                numberOfQuestions: numberOfQuestions,
                allQuestions: allQuestions,
                setAllQuestions: setAllQuestions,
                setLoading: setLoading,
              });
            }
          } else {
            loadingQuestion = false;

            getQuestions({
              type: type,
              language: language,
              filters: filters,

              numberOfQuestions: numberOfQuestions,
              allQuestions: allQuestions,
              setAllQuestions: setAllQuestions,
              setLoading: setLoading,
            });
          }
        } else {
          loadingQuestion = false;

          getQuestions({
            type: type,
            language: language,
            filters: filters,

            numberOfQuestions: numberOfQuestions,
            allQuestions: allQuestions,
            setAllQuestions: setAllQuestions,
            setLoading: setLoading,
          });
        }
      }
    });
  }
};
const explainCode = async ({ code, setExplanation, setLoading }) => {
  setLoading(true);
  axios({
    url: API_ENDPOINT,
    data: {
      model: "code-davinci-002",
      prompt: `${code}\n\n/*Explain what the previous function is doing: It`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    headers: {
      Authorization: "Bearer " + API_KEY,
    },
    method: "POST",
  }).then((response) => {
    setLoading(false);
    setExplanation(response.data.choices[0].text);
  });
};
const explainError = async ({ code }) => {
  axios({
    url: API_ENDPOINT,
    data: {
      model: "code-davinci-002",
      prompt: `${code}\n\n/*Explain why the previous function doesn't work./*`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    headers: {
      Authorization: "Bearer " + API_KEY,
    },
    method: "POST",
  }).then((response) => {
    return response.data.choices[0].text;
  });
};
const translateCode = async ({ code, fromLanguage, toLanguage }) => {
  axios({
    url: API_ENDPOINT,
    data: {
      model: "code-davinci-002",
      prompt: `#Convert this from ${fromLanguage} to ${toLanguage}\n#${fromLanguage} version\n\n${code}\n\n#End\n\$${toLanguage} version`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    headers: {
      Authorization: "Bearer " + API_KEY,
    },
    method: "POST",
  }).then((response) => {
    return response.data.choices[0].text;
  });
};
export const utils = {
  handleCompile,
  codeCompletion,
  getQuestions,
  explainCode,
  explainError,
  translateCode,
};
