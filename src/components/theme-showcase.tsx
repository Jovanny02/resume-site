import { AlertCircle, Palette, SunMoon } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Temporary preview: remove this component and its HomePage reference when done.
export function ThemeShowcase() {
  const { setTheme } = useTheme()

  return (
    <section aria-labelledby="theme-preview-title" className="mt-12 space-y-6">
      <Separator />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="theme-preview-title"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <Palette className="size-5" aria-hidden="true" />
            Theme playground
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Temporary components for exploring your palette.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Color theme">
          <Button variant="outline" onClick={() => setTheme("light")}>
            Light
          </Button>
          <Button variant="outline" onClick={() => setTheme("dark")}>
            Dark
          </Button>
          <Button variant="outline" onClick={() => setTheme("system")}>
            <SunMoon aria-hidden="true" />
            System
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buttons & badges</CardTitle>
            <CardDescription>
              Compare filled, outlined, hover, and disabled states.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="rounded-xl bg-accent p-4 text-accent-foreground">
              <p className="font-medium">Accent surface</p>
              <p className="mt-1 text-sm">
                Text and icons paired with your accent color.
              </p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-muted-foreground">
              Muted surfaces and supporting text.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
            <CardDescription>
              Try typing, toggling, and tabbing through the controls.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="preview-name" className="text-sm font-medium">
                Name
              </label>
              <Input id="preview-name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="preview-message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="preview-message"
                placeholder="Tell me about your next project…"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="preview-error" className="text-sm font-medium">
                Invalid field
              </label>
              <Input
                id="preview-error"
                defaultValue="Sample invalid value"
                aria-invalid="true"
                aria-describedby="preview-error-hint"
              />
              <p id="preview-error-hint" className="text-xs text-destructive">
                Example validation message.
              </p>
            </div>
            <Input
              aria-label="Disabled example"
              placeholder="Disabled input"
              disabled
            />
            <Separator />
            <div className="flex items-center gap-3">
              <Checkbox id="preview-checkbox" defaultChecked />
              <label htmlFor="preview-checkbox" className="text-sm">
                Example checked option
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="preview-switch" defaultChecked />
              <label htmlFor="preview-switch" className="text-sm">
                Example enabled setting
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Alert>
          <Palette aria-hidden="true" />
          <AlertTitle>Informational alert</AlertTitle>
          <AlertDescription>
            Card surfaces, borders, and muted text using your theme.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>Example error</AlertTitle>
          <AlertDescription>
            This is only a preview of destructive styling.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
