import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const AddAClass = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    const languageClass = {
      ClassName: data.className,
      ClassImage: data.image,
      instructorName: data.instructorName,
      instructorEmail: data.instructorEmail,
      price: parseFloat(data.price),
      AvailableSeat: parseFloat(data.seats),
    };
    console.log(data);
    console.log(languageClass);
    fetch("https://assignment-12-server-one-sepia.vercel.app/classes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(languageClass),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class added  successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className=" mx-auto mt-5">
      <Helmet>
        <title>Add A Class | Language Class</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Class Name</span>
            </label>
            <input
              type="text"
              placeholder="Class name"
              {...register("className", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Class Image</span>
            </label>

            <input
              type="text"
              placeholder="Class Image"
              {...register("image", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Instructor Name</span>
            </label>
            <input
              type="text"
              {...register("instructorName")}
              defaultValue={user.displayName}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Instructor Email</span>
            </label>
            <input
              type="text"
              placeholder="Instructor Email"
              {...register("instructorEmail")}
              defaultValue={user.email}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="form-control w-full  ">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Available Seats</span>
            </label>
            <input
              type="number"
              {...register("seats", { required: true })}
              placeholder="Available Seats"
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <input
          className="btn btn-sm my-5 text-center"
          type="submit"
          value="Add Class"
        />
      </form>
    </div>
  );
};

export default AddAClass;
