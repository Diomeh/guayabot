import 'module-alias/register';
import { addAliases } from 'module-alias';

// Allow ts-node to map @ to src/
// This must be done before requiring any modules
addAliases({
    '@': __dirname,
});
