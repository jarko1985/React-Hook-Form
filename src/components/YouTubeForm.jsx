"use client";
import { useForm } from "react-hook-form";

const YouTubeForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel:"",
      age:'',
      dateOfBirth: new Date(''),
    },
    mode:'onTouched'
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,touchedFields,dirtyFields,disabled,isDirty,isValid},
  } = form;
  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (errors)=>{
    console.log("Form Errors",errors);
  }

  const watchForm = watch();
  return (
    <div>
        <h1 className="text-center my-5 text-6xl">React Hook Form</h1>
      <h2 className="text-center my-5 text-4xl max-w-xl mx-auto">Watched Value: {JSON.stringify(watchForm)}</h2>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit,onError)}
        className="w-[30%] mx-auto"
      >
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "User Name is required!!" })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is Invalid",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different Email Address"
                  );
                },
                notEmpty: (fieldValue) => {
                  return fieldValue.length > 0 || "Email is Required";
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "this domain is not Supported!!"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel is required!!" })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age",{valueAsNumber:true},{ required: "age is required!!" })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth",{disabled:watch("age") === "",required:'Enter Age first'}, {valueAsDate:true},{ required: "Date of Birth is required!!" })}
          />
          <p className="error">{errors.dateOfBirth?.message}</p>
        </div>
        <button
          disabled={!isDirty || !isValid}
          className="border bg-blue-600 py-2 px-3 my-2 text-white font-semibold block"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default YouTubeForm;
