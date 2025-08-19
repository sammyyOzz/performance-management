import { BaseButton, BaseInput, BaseSelectInput } from "@/components/core"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState, ChangeEvent, FormEvent } from "react"
import { successToast, errorToast } from "@/utils/createToast"

interface ReportType {
    id: number
    name: string
    friendly_name: string
}

export const ReportsPage = () => {
    const [email, setEmail] = useState("")
    const [selectedReport, setSelectedReport] = useState("")
    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [emailError, setEmailError] = useState("")

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const isFormValid = () => {
        return email && validateEmail(email) && selectedReport && year
    }

    const { data: reportsData } = useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports`)
            return response.data
        }
    })

    const generateReportMutation = useMutation({
        mutationFn: async (data: { name: string; email: string; year: string }) => {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reports/generate`, {
                ...data,
                year: parseInt(data.year)
            })
            return response.data
        },
        onSuccess: (response) => {
            successToast({ param: null, msg: response?.message || "Report generation request sent successfully" })
            setEmail("")
            setSelectedReport("")
            setYear(new Date().getFullYear().toString())
            setEmailError("")
        },
        onError: (error: any) => {
            errorToast({ param: error, variant: "light" })
        }
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!isFormValid()) return

        const selectedReportData = reportsData?.data.find(
            (report: ReportType) => report.name === selectedReport
        )

        generateReportMutation.mutate({
            name: selectedReportData.name,
            email,
            year
        })
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
        if (!value) {
            setEmailError("Email is required")
        } else if (!validateEmail(value)) {
            setEmailError("Please enter a valid email address")
        } else {
            setEmailError("")
        }
    }

    const handleReportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedReport(e.target.value)
    }

    const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const yearValue = value === '' ? '' : Math.floor(Number(value))
        if (yearValue === '' || (yearValue >= 1900 && yearValue <= 2100)) {
            setYear(yearValue === '' ? '' : yearValue.toString())
        }
    }

    const reportOptions = reportsData?.data.map((report: ReportType) => ({
        label: report.friendly_name,
        value: report.name
    })) || []

    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">Generate Reports</h1>
                        <p className="font-normal text-xs text-[#727A86]">Select a report type and provide the email address where the report will be sent.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[32rem]">
                        <div className="grid gap-1">
                            <label className="font-medium text-sm text-black">Email Address</label>
                            <BaseInput
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className={emailError ? "border-red-40" : ""}
                            />
                            {emailError && (
                                <span className="text-red-40 text-xs">{emailError}</span>
                            )}
                        </div>

                        <div className="grid gap-1">
                            <label className="font-medium text-sm text-black">Report Type</label>
                            <BaseSelectInput
                                value={selectedReport}
                                onChange={handleReportChange}
                                required
                                options={reportOptions}
                            />
                        </div>

                        <div className="grid gap-1">
                            <label className="font-medium text-sm text-black">Year</label>
                            <BaseInput
                                type="number"
                                value={year}
                                onChange={handleYearChange}
                                required
                                min={1900}
                                max={2100}
                                step={1}
                            />
                        </div>

                        <BaseButton
                            type="submit"
                            className="button button-primary--filled button-large"
                            isLoading={generateReportMutation.isPending}
                            size="large"
                            theme="primary"
                            variant="filled"
                            disabled={!isFormValid() || generateReportMutation.isPending}
                        >
                            {generateReportMutation.isPending ? "Generating Report..." : "Generate Report"}
                        </BaseButton>
                    </form>
                </div>
            </div>
        </section>
    )
} 