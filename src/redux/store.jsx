import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import staffReducer from "./staffSlice";
import userReducer from "./userSlice";
import breederReducer from "./breederSlice";
import auctionrequestReducer from "./auctionRequestSlice";
import auctionReducer from "./auctionSlice";
import walletReducer from "./walletSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // Sử dụng sessionStorage

// Cấu hình persist cho auth (hoặc các slice khác nếu cần)
const authPersistConfig = {
  key: "auth",
  storage: sessionStorage, // Đổi từ localStorage sang sessionStorage
};

const walletPersistConfig = {
  key: "wallet",
  storage: sessionStorage,
};

// Tạo persist reducer cho auth
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWalletReducer = persistReducer(walletPersistConfig, walletReducer);

// Tạo store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    category: categoryReducer,
    staff: staffReducer,
    user: userReducer,
    breeder: breederReducer,
    auctionrequest: auctionrequestReducer,
    auction: auctionReducer,
    wallet: persistedWalletReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

export default store;
