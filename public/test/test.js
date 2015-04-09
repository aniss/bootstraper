var testsContext = require.context("../js/", true, /\.spec.jsx?$/);
testsContext.keys().forEach(testsContext);
