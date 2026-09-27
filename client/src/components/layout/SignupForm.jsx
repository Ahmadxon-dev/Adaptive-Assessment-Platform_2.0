import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast.js"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { signUpSchema } from "@/lib/validation"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"

function SignupForm() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const onSubmit = (data) => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_SERVER}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    toast({
                        title: data.error,
                        variant: "destructive",
                        duration: 4000
                    })
                    setLoading(false)
                } else {
                    toast({
                        title: data.msg,
                        variant: "success",
                        duration: 4000
                    })
                    setLoading(false)
                    navigate("/signin")
                }
            })
    }

    return (
        // <div className={cn("flex flex-col gap-6 justify-center mx-auto h-[80vh] w-3/12")}>
        <div className="min-h-screen  bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-lg mx-auto ">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{"Ro'yxatdan o'tish"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-5 ">
                                <FieldGroup className={`gap-3`}>
                                    <Controller
                                        name="name"
                                        classname="space-y-0"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="gap-1">
                                                <FieldLabel htmlFor="name">Ism</FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="name"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Ismingizni kiriting"
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="gap-1">
                                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="email"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="m@example.com"
                                                    type="email"
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="gap-1">
                                                <FieldLabel htmlFor="password">Parol</FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="********"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={togglePasswordVisibility}
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </Button>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <Button type="submit" className="w-full">
                                    {" Ro'yxatdan o'tish"}
                                    {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : ""}
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Foydalanuvchi oldin yaratilganmi?{" "}
                                <Link to="/signin" className="underline underline-offset-4">
                                    Kirish
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignupForm
