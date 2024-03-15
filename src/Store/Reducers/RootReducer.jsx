import { combineReducers } from "@reduxjs/toolkit";
import maincategoryReducer from "./MaincategoryReducer";
import subcategoryReducer from "./SubcategoryReducer";
import brandReducer from "./BrandReducer";
import productReducer from "./ProductReducer";
import testimonialReducer from "./TestimonialReducer";
import cartReducer from "./CartReducer";
import wishlistReducer from "./WishlistReducer";
import checkoutReducer from "./CheckoutReducer";
import newsletterReducer from "./NewsletterReducer";
import contactUsReducer from "./ContactUsReducer";

export default combineReducers({
    MaincategoryStateData: maincategoryReducer,
    SubcategoryStateData: subcategoryReducer,
    BrandStateData: brandReducer,
    ProductStateData: productReducer,
    TestimonialStateData:testimonialReducer,
    CartStateData:cartReducer,
    WishlistStateData:wishlistReducer,
    CheckoutStateData:checkoutReducer,
    NewsletterStateData:newsletterReducer,
    ContactUsStateData:contactUsReducer,
})
