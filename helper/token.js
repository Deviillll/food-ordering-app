import jwt from "jsonwebtoken";
export const generateToken = async (user) => {
    const token = jwt.sign({ id: user._id ,
        email: user.email,
        

    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
    }

    export const verifyToken = async (token) => {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, email } = decoded;
        return { id, email };
    }