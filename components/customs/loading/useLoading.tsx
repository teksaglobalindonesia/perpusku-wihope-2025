"use client";

import { useState, useEffect } from "react";

export default function useLoading(durasi = 1500) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, durasi);

        return () => clearTimeout(timer);
    }, [durasi]);

    return loading;
}
