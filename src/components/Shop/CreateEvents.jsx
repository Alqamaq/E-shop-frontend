import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify'
import { createEvent } from '../../redux/actions/event';



const CreateEvents = () => {
    const { seller } = useSelector((state) => state.seller)
    const { success, error } = useSelector((state) => state.event);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // store actual File objects
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => URL.createObjectURL(file));

        setImages((prevImages) => [...prevImages, ...files]);
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();

        // append each file so backend receives array of images
        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("originalPrice", originalPrice);
        formData.append("discountPrice", discountPrice);
        formData.append("stock", stock);
        formData.append("shopId", seller._id);
        formData.append("start_Date", startDate.toISOString());
        formData.append("Finish_Date", endDate.toISOString());

        // dispatch the FormData directly
        dispatch(createEvent(formData));
    }

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);

    const minEndDate = startDate
        ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        : "";



    // revoke object URLs when imagePreviews change or on unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success("Event Product Created Successfully!")
            navigate('/dashboard-events');
            window.location.reload();
        }
    }, [dispatch, success, error])

    return (
        <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] p-3 rounded-[4px] overflow-y-scroll'>
            <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
            {/* create Event form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your product name..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your event product description..."
                    ></textarea>
                    <br />
                    <div>
                        <label className="pb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full mt-2 border h-[35px] rounded-[5px]"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Choose a category">Choose a category</option>
                            {categoriesData &&
                                categoriesData.map((i) => (
                                    <option value={i.title} key={i.title}>
                                        {i.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <br />
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter your event product tags..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Original Price</label>
                    <input
                        type="number"
                        name="price"
                        value={originalPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Enter your event product price..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={discountPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="Enter your event product price with discount..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={stock}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter your event product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Event Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="price"
                        id='start-date'
                        value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleStartDateChange}
                        min={today}
                        placeholder="Enter your event start date..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Event End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="price"
                        id='start-date'
                        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleEndDateChange}
                        min={minEndDate}
                        placeholder="Enter your event end date..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name=""
                        id="upload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {imagePreviews &&
                            imagePreviews.map((url, idx) => (
                                <img
                                    src={url}
                                    key={idx}
                                    alt="preview"
                                    className="h-[120px] w-[120px] object-cover m-2"
                                />
                            ))}
                    </div>
                    <br />
                    <div>
                        <input
                            type="submit"
                            value="Create"
                            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            </form>

        </div>

    )
}

export default CreateEvents;