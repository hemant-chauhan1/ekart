export default function formValidation(event) {
    let { name, value } = event.target
    switch (name) {
        case "name":
        case "subject":
        case "color":
        case "username":
        case "profession":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 3 || value.length > 50)
                return name + " field must required atleast 3 characters and must be less then 50 characters"
            else
                return ""
        case "size":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length > 10)
                return name + " field must be less then 10 characters"
            else
                return ""
        case "baseprice":
            if (value.length === 0)
                return name + " field must required"
            else if (value < 1)
                return "Baseprice must be greater then 0"
            else
                return ""
        case "discount":
            if (value.length === 0)
                return name + " field must required"
            else if (value < 1 || value > 100)
                return "Discount must be greater then 1 and less then 100"
            else
                return ""
        case "rating":
            if (value.length === 0)
                return name + " field must required"
            else if (value < 1 || value > 5)
                return "Rating must be less than or equal to 1 and less then equal to 5"
            else
                return ""
        case "message":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 3)
                return name + " field must required atleast 3 characters"
            else
                return ""
        case "password":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 8 || value.length > 50)
                return name + " field must required atleast 8 characters and must be less then 50 characters"
            else
                return ""
        case "email":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 11 || value.length > 50)
                return name + " field must required atleast 8 characters and must be less then 50 characters"
            else
                return ""
        case "phone":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length != 10)
                return name + " field must required atleast 10 characters"
            else if (value >= 0 && value <= 5)
                return value + "number is invalid"
            else
                return ""
        default:
            return ""
    }
}