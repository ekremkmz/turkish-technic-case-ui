import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/locations/list.tsx", { id: "home" }),
    route("locations", "routes/locations/list.tsx", { id: "locations-list" }),
    route("locations/new", "routes/locations/form.tsx", { id: "locations-new" }),
    route("locations/:id/edit", "routes/locations/form.tsx", { id: "locations-edit" }),

    route("transportations", "routes/transportations/list.tsx", { id: "transportations-list" }),
    route("transportations/new", "routes/transportations/form.tsx", { id: "transportations-new" }),
    route("transportations/:id/edit", "routes/transportations/form.tsx", { id: "transportations-edit" }),

    route("transportation-schedules", "routes/transportation-schedules/list.tsx", { id: "transportation-schedules-list" }),
    route("transportation-schedules/new", "routes/transportation-schedules/form.tsx", { id: "transportation-schedules-new" }),

    route("routes", "routes/routes/search.tsx"),
] satisfies RouteConfig;
