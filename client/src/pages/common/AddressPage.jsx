import { AccountLayout } from "../../components/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authApi } from "../../api";

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
    setFormValues((prevValues) => ({ ...prevValues, province: provinceName }));

    const provinceCode = provinceMap[provinceName] || "";
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
    setFormValues((prevValues) => ({ ...prevValues, district: districtName }));

    const districtCode = districtMap[districtName] || "";
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
        const data = {
          name: formValues.name,
          phone: formValues.phone,
          address: formValues.address,
          province: formValues.province,
          district: formValues.district,
          ward: formValues.ward,
        };
        const response = await authApi.updateAddress(data);
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: "Thông tin đã được cập nhật thành công.",
        });
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
        Swal.fire({
          icon: "error",
          title: "Đăng ký thất bại!",
          text: "Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AccountLayout>
      <div className="text-primary">
        <h3 className="py-4 font-vs-std font-semibold text-[2rem] sm:text-[1.7rem] border-b border-primary">
          Đăng ký địa chỉ
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-primary font-medium text-lg mb-2"
              >
                Người nhận hàng
              </label>
              <input
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                className={`p-4 w-full border rounded-lg shadow-sm focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-primary font-medium text-lg mb-2"
              >
                Số điện thoại
              </label>
              <input
                name="phone"
                type="text"
                value={formValues.phone}
                onChange={handleChange}
                className={`p-4 w-full border rounded-lg shadow-sm focus:outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-primary font-medium text-lg mb-2"
              >
                Địa chỉ
              </label>
              <input
                name="address"
                type="text"
                value={formValues.address}
                onChange={handleChange}
                className={`p-4 w-full border rounded-lg shadow-sm focus:outline-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.address}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="province"
                className="block text-primary font-medium text-lg mb-2"
              >
                Tỉnh/Thành phố
              </label>
              <select
                name="province"
                value={formValues.province}
                onChange={handleProvinceChange}
                className={`p-4 w-full border rounded-lg shadow-sm focus:outline-none ${
                  errors.province ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option
                    key={province.province_name}
                    value={province.province_name}
                  >
                    {province.province_name}
                  </option>
                ))}
              </select>
              {errors.province && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.province}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="district"
                className="block text-primary font-medium text-lg mb-2"
              >
                Quận/Huyện
              </label>
              <select
                name="district"
                value={formValues.district}
                onChange={handleDistrictChange}
                className={`p-4 w-full border rounded-lg shadow-sm focus:outline-none ${
                  errors.district ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map((district) => (
                  <option
                    key={district.district_name}
                    value={district.district_name}
                  >
                    {district.district_name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.district}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="ward"
                className="block text-primary font-medium text-lg mb-2"
              >
                Phường/Xã
              </label>
              <select
                name="ward"
                value={formValues.ward}
                onChange={handleChange}
                className={`p-4 w-full border rounded-lg shadow-sm focus:outline-none ${
                  errors.ward ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Chọn phường/xã</option>
                {wards.map((ward) => (
                  <option key={ward.ward_name} value={ward.ward_name}>
                    {ward.ward_name}
                  </option>
                ))}
              </select>
              {errors.ward && (
                <div className="text-red-500 text-sm mt-1">{errors.ward}</div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-primary-dark disabled:bg-gray-400"
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}

export default AddressPage;
