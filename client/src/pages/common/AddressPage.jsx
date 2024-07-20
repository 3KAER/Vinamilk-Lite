import { AccountLayout } from "../../components/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressPage() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceMap, setProvinceMap] = useState({});
  const [districtMap, setDistrictMap] = useState({});
  const [wardMap, setWardMap] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        const provinceList = response.data.results;
        setProvinces(provinceList);
        setProvinceMap(
          provinceList.reduce((acc, province) => {
            acc[province.province_name] = province.province_id;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching provinces:", error.message);
      }
    };

    fetchProvinces();
  }, []);

  // Handle province change and fetch districts
  const handleProvinceChange = async (event) => {
    const provinceName = event.target.value;
    const provinceCode = provinceMap[provinceName] || "";
    setFormValues((prevValues) => ({ ...prevValues, province: provinceCode }));

    if (provinceCode) {
      try {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/province/district/${provinceCode}`
        );
        const districtList = response.data.results || [];
        setDistricts(districtList);
        setDistrictMap(
          districtList.reduce((acc, district) => {
            acc[district.district_name] = district.district_id;
            return acc;
          }, {})
        );
        setWards([]); // Reset wards when no districts found
      } catch (error) {
        console.error("Error fetching districts:", error.message);
        setDistricts([]);
        setWards([]);
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  // Handle district change and fetch wards
  const handleDistrictChange = async (event) => {
    const districtName = event.target.value;
    const districtCode = districtMap[districtName] || "";
    setFormValues((prevValues) => ({ ...prevValues, district: districtCode }));

    if (districtCode) {
      try {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/province/ward/${districtCode}`
        );
        const wardList = response.data.results || [];
        setWards(wardList);
        setWardMap(
          wardList.reduce((acc, ward) => {
            acc[ward.ward_name] = ward.ward_id;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching wards:", error.message);
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = "Bắt buộc";
    if (!formValues.phone.match(/^[0-9]+$/) || formValues.phone.length < 10)
      newErrors.phone = "Chỉ bao gồm số và tối thiểu 10 số";
    if (!formValues.address) newErrors.address = "Bắt buộc";
    if (!formValues.province) newErrors.province = "Bắt buộc";
    if (!formValues.district) newErrors.district = "Bắt buộc";
    if (!formValues.ward) newErrors.ward = "Bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://api.example.com/address",
          formValues
        );
        console.log(response.data);
        alert("Đăng ký thành công!");
        setFormValues({
          name: "",
          phone: "",
          address: "",
          province: "",
          district: "",
          ward: "",
        });
      } catch (error) {
        console.error("Có lỗi xảy ra:", error.message);
        alert("Đăng ký thất bại!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AccountLayout>
      <div className="text-primary">
        <h3 className="py-2 font-vs-std font-semibold text-[2rem] sm:text-[1.7rem] border-b border-primary">
          Đăng ký địa chỉ
        </h3>
        <form
          className="bg-cream p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Họ và tên
            </label>
            <input
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm"
            />
            {errors.name && (
              <div className="text-red-600 text-sm mt-1">{errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold"
            >
              Số điện thoại
            </label>
            <input
              name="phone"
              type="text"
              value={formValues.phone}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm"
            />
            {errors.phone && (
              <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold"
            >
              Địa chỉ
            </label>
            <input
              name="address"
              type="text"
              value={formValues.address}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm"
            />
            {errors.address && (
              <div className="text-red-600 text-sm mt-1">{errors.address}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="province"
              className="block text-gray-700 font-semibold"
            >
              Tỉnh/Thành phố
            </label>
            <select
              name="province"
              value={
                Object.keys(provinceMap).find(
                  (key) => provinceMap[key] === formValues.province
                ) || ""
              }
              onChange={handleProvinceChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm"
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province) => (
                <option
                  key={province.province_id}
                  value={province.province_name}
                >
                  {province.province_name}
                </option>
              ))}
            </select>
            {errors.province && (
              <div className="text-red-600 text-sm mt-1">{errors.province}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-gray-700 font-semibold"
            >
              Quận/Huyện
            </label>
            <select
              name="district"
              value={
                Object.keys(districtMap).find(
                  (key) => districtMap[key] === formValues.district
                ) || ""
              }
              onChange={handleDistrictChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm"
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option
                  key={district.district_id}
                  value={district.district_name}
                >
                  {district.district_name}
                </option>
              ))}
            </select>
            {errors.district && (
              <div className="text-red-600 text-sm mt-1">{errors.district}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="ward" className="block text-gray-700 font-semibold">
              Phường/Xã
            </label>
            <select
              name="ward"
              value={
                Object.keys(wardMap).find(
                  (key) => wardMap[key] === formValues.ward
                ) || ""
              }
              onChange={(event) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  ward: wardMap[event.target.value] || "",
                }))
              }
              className="mt-1 p-3 w-full border rounded-lg shadow-sm"
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_name}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
            {errors.ward && (
              <div className="text-red-600 text-sm mt-1">{errors.ward}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold shadow-md"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}

export default AddressPage;
