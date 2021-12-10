import React, { useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { setDesc } from "../../modules/editor";
import { useDispatch, useSelector } from "react-redux";

const BtnContainer = styled.div`
  width: 21.875rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.5rem;
`;

const Btn = styled.button`
  width: 8.75rem;
  height: 3rem;
  background-color: #f5f5f7;
  /* border: 3px solid #FFFFFF; */
  /* border: none; */
  box-sizing: border-box;
  border-radius: 1.5625rem;
  cursor: pointer;
`;

function ToastUi({ title, folder, tags, token }) {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const content = useSelector((state) => state.test.desc);

  const onChange = () => {
    const editorData = editorRef.current.getInstance().getMarkdown();
    dispatch(setDesc(editorData));
  };

  const handleCreate = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .post("http://127.0.0.1:8000/questions/create/", {
          title: title,
          desc: content,
          question_folder: folder,
          question_tags: tags,
        })
        .then((response) => {
          console.log(response);
          router.push(`/`);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(tags);
  return (
    <>
      <Editor
        initialValue={content}
        previewStyle="vertical"
        height="702px"
        initialEditType="wysiwyg"
        placeholder="내용을 입력해주세요."
        autofocus={false}
        ref={editorRef}
        onChange={() => onChange()}
        language="ko"
        events={{
          focus: () => {
            console.log('⭐ focus');
          },
        }}
      />
      <BtnContainer>
        <Btn onClick={handleCreate}>작성하기</Btn>
        <Btn>나가기</Btn>
      </BtnContainer>
    </>
  );
}

export default React.memo(ToastUi);
