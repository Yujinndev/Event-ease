import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("data:", data)
  }

  return (
    <div className="relative overflow-x-hidden p-20">
      <form
        className="mx-auto flex max-w-3xl flex-col gap-2 rounded-sm border p-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email is not valid"
              }

              return true
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <small className="text-red-500">{errors.email.message}</small>
        )}
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <small className="text-red-500">{errors.password.message}</small>
        )}
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? "Loading ..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}

export default SignIn
