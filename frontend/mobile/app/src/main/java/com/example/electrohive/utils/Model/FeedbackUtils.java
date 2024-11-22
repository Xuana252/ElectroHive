package com.example.electrohive.utils.Model;

import com.example.electrohive.Models.Category;
import com.example.electrohive.Models.Customer;
import com.example.electrohive.Models.Product;
import com.example.electrohive.Models.ProductAttribute;
import com.example.electrohive.Models.ProductFeedback;
import com.example.electrohive.Models.ProductImage;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

public class FeedbackUtils {
    public static List<ProductFeedback> parseProductFeedbacks(JsonArray feedbackArray) {
        List<ProductFeedback> productFeedbackList = new ArrayList<>();
        for (int i = 0; i < feedbackArray.size(); i++) {
            JsonObject feedbackJson = feedbackArray.get(i).getAsJsonObject();
            String feedbackId = feedbackJson.get("feedback_id").getAsString();
            String productId = feedbackJson.get("product_id").getAsString();
            String customerId = feedbackJson.get("customer_id").getAsString();
            String feedback = feedbackJson.get("feedback").getAsString();
            int rating = feedbackJson.get("rating").getAsInt();
            String createdAt = feedbackJson.get("created_at").getAsString();
            JsonObject customer = feedbackJson.has("customer")?feedbackJson.get("customer").getAsJsonObject():null;

            Customer feedbackCustomer = customer!=null?CustomerUtils.parseCustomer(customer):null;
            ProductFeedback productFeedback = new ProductFeedback(feedbackId, customerId, productId, rating, feedback, createdAt);
            productFeedback.setCustomer(feedbackCustomer);
            productFeedbackList.add(productFeedback);
        }
        return productFeedbackList;
    }
}