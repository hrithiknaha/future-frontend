import React from "react";

const Header = () => {
    return (
        <div class="flex justify-between items-center px-4 py-4 bg-blue-500">
            <div class="text-white font-semibold text-lg">Future</div>
            <div class="flex space-x-4">
                <button class="text-white">Profile</button>
                <button class="text-white">Logout</button>
            </div>
        </div>
    );
};

export default Header;
