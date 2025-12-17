// Uncomment this file to enable instrumentation and observability using OpenTelemetry
// Refer to the docs for installation instructions: https://docs.medusajs.com/v2/debugging-and-testing/instrumentation

// const { registerOtel } = require("@medusajs/medusa")
// // If using an exporter other than Zipkin, require it here.
// const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')

// // If using an exporter other than Zipkin, initialize it here.
// const exporter = new ZipkinExporter({
//   serviceName: 'my-medusa-project',
// })

// export function register() {
//   registerOtel({
//     serviceName: 'medusajs',
//     // pass exporter
//     exporter,
//     instrument: {
//       http: true,
//       workflows: true,
//       remoteQuery: true
//     },
//   })
// }