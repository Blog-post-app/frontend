import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../components/moduleToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object({
  title: yup
    .string("Add a post title")
    .min(4, "text content should havea minimum of 4 characters ")
    .required("Post title is required"),
  content: yup
    .string("Add text content")
    .min(10, "text content should havea minimum of 10 characters ")
    .required("text content is required"),
});

const CreateHakkimda2 = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name,
      email,
      phone,
      profession,
      content
    },

    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      updatePost(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  //show post by Id
  const singlePostById = async () => {
    // console.log(id)
    try {
      const { data } = await axios.get(`/api/admin/profile`);
      console.log(data.profile);
      setName(data.profile.name);
      setEmail(data.profile.email);
      setPhone(data.profile.phone);
      setProfession(data.profile.profession);
      setContent(data.profile.content);
      // console.log('single post admin', data.post)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    singlePostById();
  }, []);

  const updatePost = async (values) => {
    let updatedProfil = {name: name,profession:profession, email:email, phone:phone,content:content}
    try {
      const { data } = await axios.put(`/api/admin/profile/update`, updatedProfil);
      if (data.success === true) {
        toast.success("profile updated");
         navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Edit post{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            label="Name"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Name"
            value={values.name}
            onChange={(e)=> setName(e.target.value)}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="email"
            label="Email"
            name="email"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Email"
            value={values.email}
            onChange={(e)=> setEmail(e.target.value)}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
  <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Phone"
            value={values.phone}
            onChange={(e)=> setPhone(e.target.value)}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
            <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="profession"
            label="Profession"
            name="profession"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Profession"
            value={values.profession}
            onChange={(e)=> setProfession(e.target.value)}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <Box sx={{ mb: 3 }}>
            <ReactQuill
              theme="snow"
              placeholder={"Write the post content..."}
              modules={modules}
              value={values.content}
              onChange={(e) => setFieldValue("content", e)}
            />
            <Box
              component="span"
              sx={{ color: "#d32f2f", fontSize: "12px", pl: 2 }}
            >
              {touched.content && errors.content}
            </Box>
          </Box>

     
          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
            // disabled={loading}
            onClick={updatePost}
          >
            Update post
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateHakkimda2;
