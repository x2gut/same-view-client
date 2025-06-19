import { Button, Container } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Home, Search, Rocket, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">
        <Container>
          <div className="flex justify-center flex-col gap-8 items-center pt-20 relative z-10">
            <div className="relative">
              <h2
                className={`text-9xl font-bold bg-gradient-to-r from-[var(--text)] to-[var(--accent)] bg-clip-text text-transparent select-none transition-all duration-200`}
              >
                404
              </h2>
            </div>

            <Card
              variant="elevated"
              className="relative px-10 py-10 max-w-2xl rounded-2xl border-[var(--card-border)] bg-[var(--card)] shadow-xl hover:scale-105 duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 rounded-2xl blur opacity-50 dark:opacity-30" />

              <div className="relative">
                <CardHeader className="flex justify-center items-center mb-6">
                  <div className="relative">
                    <Rocket
                      size={56}
                      className="text-[var(--accent)] animate-bounce transform hover:rotate-12 hover:translate-x-3 hover:-translate-y-3 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>

                <CardTitle>
                  <h4 className="text-4xl font-bold text-center pb-6 text-[var(--text)]">
                    Page Not Found
                  </h4>
                </CardTitle>

                <CardDescription>
                  <p className="text-lg text-center text-[var(--text-secondary)] leading-relaxed mb-6">
                    The page you're looking for seems to have drifted into
                    digital space. Let's help you navigate back to familiar
                    territory.
                  </p>
                </CardDescription>

                <CardContent>
                  <div className="flex justify-center gap-4 py-6 flex-wrap">
                    <Button
                      onClick={handleHomeClick}
                      variant="primary"
                      className="group flex gap-3 items-center px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <Home size={18} />
                      Back to Home
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Button>

                    <Button
                      variant="secondary"
                      className="group flex gap-3 items-center px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <Search size={18} className="group-hover:animate-pulse" />
                      My Rooms
                    </Button>
                  </div>
                  <div className="bg-[var(--accent)]/5 dark:bg-[var(--accent)]/10 rounded-xl p-4 mt-6 border border-[var(--accent)]/20">
                    <p className="text-center text-sm text-[var(--text-secondary)]">
                      💡 <strong>Tip:</strong> Double-check the URL or use the
                      navigation menu to find what you're looking for.
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page404;
