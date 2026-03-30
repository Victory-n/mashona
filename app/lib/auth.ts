// NOTE: In a real app, passwords would never be stored in plain text
// or shipped to the client. This is a static demo only.
import users from "../data/json/user.json";
import type { User } from "@/app/types";

export function validateLogin(email: string, password: string): User | null {
    const user = (users as User[]).find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    return user ?? null;
}