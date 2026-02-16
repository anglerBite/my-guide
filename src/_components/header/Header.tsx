'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import HomeBtn from "../homebtn/HomeBtn";
import { IoLogIn } from "react-icons/io5";

type Theme = "light" | "dark";

const Header = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    // クライアント初期化：OS設定 or localStorage を見て初期テーマを決める
    useEffect(() => {
        if (typeof window === "undefined") return;

        setMounted(true);

        const stored = window.localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            applyTheme(stored);
            return;
        }

        // localStorage にない場合は OS の設定を初期値にする
        //window.matchMedia は CSS のメディアクエリを JavaScript から読む方法。
        //このメディアクエリは「OS がダークモードか？」を読み取る特殊なやつ。
        //matchMedia はオブジェクトを返す。 その中の matches プロパティが boolean。
        /*例{
            matches: true or false,
            media: "(prefers-color-scheme: dark)",
            ...
            }*/
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme: Theme = prefersDark ? "dark" : "light";
        applyTheme(initialTheme);
    }, []);

    const applyTheme = (nextTheme: Theme) => {
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        window.localStorage.setItem("theme", nextTheme);
    };

    const toggleTheme = () => {
        setTheme(prev => {
            const next: Theme = prev === "dark" ? "light" : "dark";
            //document.documentElement は HTML文書の最上位要素、つまり <html> タグを指す
            //setAttribute これは HTML要素に 属性を付ける命令。 ここでは data-theme 属性を切り替えることで CSS 側でテーマを変更できる
            document.documentElement.setAttribute("data-theme", next);
            window.localStorage.setItem("theme", next);
            return next;
        });
    };

    return (
        <ul className="flex justify-end gap-15 items-center">
            <li><HomeBtn /></li>
            <li onClick={toggleTheme}>
                {theme === "dark" ? (
                    <MdOutlineDarkMode className="text-yellow-300 text-3xl cursor-pointer" />
                ) : (
                    <MdOutlineLightMode className="text-black text-3xl cursor-pointer" />
                )}
            </li>
            <li className="cursor-pointer"><Link href="/login"><IoLogIn className="text-4xl" /></Link></li>
        </ul>
    );
};

export default Header;