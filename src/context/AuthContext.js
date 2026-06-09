"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "ngocthanh_customer_auth";
const ORDERS_KEY = "ngocthanh_demo_orders";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    if (!parsedValue || parsedValue.role !== "customer") {
      return null;
    }

    return parsedValue;
  } catch (error) {
    console.error("Cannot read customer auth from localStorage", error);
    return null;
  }
}

function readStoredOrders() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = localStorage.getItem(ORDERS_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("Cannot read demo orders from localStorage", error);
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrders(readStoredOrders());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    function syncOrders() {
      setOrders(readStoredOrders());
    }

    window.addEventListener("storage", syncOrders);
    window.addEventListener("ngocthanh-orders-updated", syncOrders);

    return () => {
      window.removeEventListener("storage", syncOrders);
      window.removeEventListener("ngocthanh-orders-updated", syncOrders);
    };
  }, []);

  const register = ({ name, email, phone, password }) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !password) {
      return {
        ok: false,
        message: "Vui lòng nhập đầy đủ họ tên, email, số điện thoại và mật khẩu.",
      };
    }

    const newUser = {
      id: `cus_${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      password,
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);

    return {
      ok: true,
      message: "Tạo tài khoản demo thành công.",
    };
  };

  const login = ({ email, password }) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!user) {
      return {
        ok: false,
        message: "Chưa có tài khoản demo. Vui lòng đăng ký trước.",
      };
    }

    if (user.email !== trimmedEmail || user.password !== password) {
      return {
        ok: false,
        message: "Email hoặc mật khẩu chưa đúng.",
      };
    }

    setUser((currentUser) => (currentUser ? { ...currentUser } : currentUser));

    return {
      ok: true,
      message: "Đăng nhập thành công.",
    };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = ({ name, phone }) => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      return {
        ok: false,
        message: "Vui lòng nhập đủ họ tên và số điện thoại.",
      };
    }

    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        name: trimmedName,
        phone: trimmedPhone,
      };
    });

    return {
      ok: true,
      message: "Cập nhật hồ sơ thành công.",
    };
  };

  const updateAddress = ({ address, city, district }) => {
    if (!address.trim() || !city.trim() || !district.trim()) {
      return {
        ok: false,
        message: "Vui lòng nhập đầy đủ địa chỉ nhận hàng.",
      };
    }

    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        addressBook: [
          {
            id: "default-address",
            fullAddress: address.trim(),
            city: city.trim(),
            district: district.trim(),
          },
        ],
      };
    });

    return {
      ok: true,
      message: "Cập nhật địa chỉ thành công.",
    };
  };

  const customerOrders = useMemo(() => {
    if (!user) {
      return [];
    }

    return orders.filter((order) => order.customerEmail?.toLowerCase() === user.email);
  }, [orders, user]);

  const value = {
    user,
    hydrated,
    isLoggedIn: Boolean(user),
    register,
    login,
    logout,
    updateProfile,
    updateAddress,
    customerOrders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}