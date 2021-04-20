import Snap from "../../../types/Snap";

import { countSnapsForUser } from "./CountSnapsForUser";

describe("Counting snaps for the user", () => {
    it("returns 0 if there are no snaps", () => {
        const snaps: Snap[] = [];
        const userId = "test user id";

        const result = countSnapsForUser(userId, snaps);

        expect(result).toBe(0);
    });

    it("returns 0 if there are no snaps for the user", () => {
        const snaps: Snap[] = [
            {
                to: ["different_user_id"],
                from: "",
                body: "",
                timestamp: new Date(),
            },
        ];
        const userId = "test user id";

        const result = countSnapsForUser(userId, snaps);

        expect(result).toBe(0);
    });

    it("returns 1 if there is 1 snap just for that user", () => {
        const userId = "test user id";
        const snaps: Snap[] = [
            {
                to: [userId],
                from: "",
                body: "",
                timestamp: new Date(),
            },
        ];

        const result = countSnapsForUser(userId, snaps);

        expect(result).toBe(1);
    });

    it("returns 2 if there is 1 snap just for that user and another snap for that user and another user", () => {
        const userId = "test user id";
        const snaps: Snap[] = [
            {
                to: [userId],
                from: "",
                body: "",
                timestamp: new Date(),
            },
            {
                to: ["another_user_id", userId],
                from: "",
                body: "",
                timestamp: new Date(),
            },
        ];

        const result = countSnapsForUser(userId, snaps);

        expect(result).toBe(2);
    });
});
