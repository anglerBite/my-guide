'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const credentials = {
            email: email.trim().toLowerCase(),
            password: password.trim()
        };

        if (!credentials.email || !credentials.password) {
            setErrorMessage('メールアドレスとパスワードを入力してください');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const result = await response.json().catch(() => null) as { redirectTo?: string; message?: string } | null;

            if (!response.ok) {
                throw new Error(result?.message ?? 'ログインに失敗しました');
            }

            setEmail('');
            setPassword('');
            router.push(result?.redirectTo ?? '/');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'ログインに失敗しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center -mt-[100px]">
            <div className="w-full max-w-md">
                {/* フォームカード */}
                <div className="bg-[var(--article-bg)] rounded-lg shadow-lg p-8 border border-[var(--border-color)]">
                    {/* ヘッダー */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">Login</h1>
                        <p className="opacity-60">アカウントにログインしてください</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* メールアドレス */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-foreground mb-2"
                            >
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-md bg-[var(--background)] border-2 border-gray-300 focus:border-[var(--border-color)] focus:outline-none transition-colors"
                                placeholder="example@email.com"
                            />
                        </div>

                        {/* パスワード */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold mb-2"
                            >
                                パスワード
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-md bg-[var(--background)] border-2 border-gray-300 focus:border-[var(--border-color)] focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* パスワードを忘れた */}
                        <div className="text-right">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-[var(--border-color)] hover:text-[#ff2911] font-medium transition-colors"
                            >
                                パスワードを忘れた場合
                            </Link>
                        </div>

                        {errorMessage && (
                            <p className="text-sm text-red-600 text-center">
                                {errorMessage}
                            </p>
                        )}

                        {/* ログインボタン */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-[var(--border-color)] hover:bg-[#ff2911] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-md transition-colors text-lg"
                        >
                            {isSubmitting ? 'ログイン中...' : 'ログイン'}
                        </button>
                    </form>

                    {/* 区切り線 */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[var(--article-bg)] opacity-60">
                                または
                            </span>
                        </div>
                    </div>

                    {/* 新規登録リンク */}
                    <div className="text-center">
                        <p className="text-sm opacity-80">
                            アカウントをお持ちでないですか？{' '}
                            <Link
                                href="/signup"
                                className="text-[var(--border-color)] hover:text-[#ff2911] font-semibold transition-colors"
                            >
                                新規登録
                            </Link>
                        </p>
                    </div>
                </div>

                {/* トップページへ戻る */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                        ← トップページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
