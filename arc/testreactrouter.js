import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import routes from './routes'
import { renderToString } from 'react-dom/server'

serve((req, res) => {
    let location = createLocation(req.url)

    match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (redirectLocation)
            res.redirect(301, redirectLocation.pathname + redirectLocation.search)
        else if (error)
            res.send(500, error.message)
        else if (renderProps == null)
            res.send(404, 'Not found')
        else
            res.send(renderToString(<RoutingContext {...renderProps}/>))
    })
})