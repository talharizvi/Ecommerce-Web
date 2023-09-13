import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../Profile/profile.css';

function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
      } = useForm();
    
    const onSubmit = (data) => {
        // Handle form submission (e.g., save data to state or API)
        alert('profile saved')
        console.log(data);
    };

    //const isGSTRegistered = getValues("isGSTRegistered");
    const [isGSTRegistered, setIsGSTRegistered] = useState("no");

    // Function to handle changes in the GST radio buttons
    const handleGSTChange = (e) => {
        setIsGSTRegistered(e.target.value);
    };

    return (
        console.log('isGSTRegistered', isGSTRegistered),
        <div className="profile">
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="gender-input">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    </div>
                    {errors.email && <p className="errorText">{errors.email.message}</p>}
    
                    <label>Mobile</label>
                    <input
                        type="text"
                        {...register("mobile", {
                            required: "Mobile is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter a valid 10-digit mobile number",
                            },
                        })}
                    />
                    {errors.mobile && <p className="errorText">{errors.mobile.message}</p>}
    
                    <label>Address</label>
                    <input
                        type="text"
                        {...register("address", { required: true })}
                    />
                    {errors.address && <p className="errorText">Address is required.</p>}
    
                    <div className="gender-input">    
                    <label>Gender</label>
                    <select {...register("gender", { required: true })}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="errorText">Gender is required.</p>}
                    </div>

                    <div>    
                    <label>GST Registered</label>
                    <div>
                        <label>
                            <input type="radio" value="yes" {...register("isGSTRegistered", { required: true })} onChange={handleGSTChange} checked={isGSTRegistered === "yes"}/> Yes
                        </label>
                        <label>
                            <input type="radio" value="no" {...register("isGSTRegistered", { required: true })} onChange={handleGSTChange} checked={isGSTRegistered === "no"}/> No
                        </label>
                    </div>
                    {errors.isGSTRegistered && <p className="errorText">GST Registration is required.</p>}
    
                {isGSTRegistered === "yes" && (
                        <div className="gender-input">
                        <label>GST Number (16-18 digits)</label>
                        <input
                            type="text"
                            {...register("gstNumber", {
                                required: true,
                                pattern: /^[0-9]{16,18}$/,
                            })}
                        />
                        {errors.gstNumber && <p className="errorText">Enter a valid GST number (16-18 digits).</p>}
                        </div>
                )}
                </div>
    
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Profile;