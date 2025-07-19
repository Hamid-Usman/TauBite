import { useGetAnalysis } from "@/app/api/admin/getAnalysis";

export default function AnalysisContent() {
    const { data: analysis, isLoading } = useGetAnalysis() // Your data fetching function
    
    if (!analysis?.analysis) {
        return <p>No analysis available</p>;
    }

    return <p>{analysis.analysis}</p>;
}