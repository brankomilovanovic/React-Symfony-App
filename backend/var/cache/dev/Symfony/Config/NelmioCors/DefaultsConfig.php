<?php

namespace Symfony\Config\NelmioCors;

use Symfony\Component\Config\Loader\ParamConfigurator;
use Symfony\Component\Config\Definition\Exception\InvalidConfigurationException;

/**
 * This class is automatically generated to help in creating a config.
 */
class DefaultsConfig 
{
    private $allowCredentials;
    private $allowOrigin;
    private $allowHeaders;
    private $allowMethods;
    private $exposeHeaders;
    private $maxAge;
    private $hosts;
    private $originRegex;
    private $forcedAllowOriginValue;
    private $_usedProperties = [];

    /**
     * @default false
     * @param ParamConfigurator|bool $value
     * @return $this
     */
    public function allowCredentials($value): static
    {
        $this->_usedProperties['allowCredentials'] = true;
        $this->allowCredentials = $value;

        return $this;
    }

    /**
     * @param mixed $value
     *
     * @return $this
     */
    public function allowOrigin(mixed $value): static
    {
        $this->_usedProperties['allowOrigin'] = true;
        $this->allowOrigin = $value;

        return $this;
    }

    /**
     * @param mixed $value
     *
     * @return $this
     */
    public function allowHeaders(mixed $value): static
    {
        $this->_usedProperties['allowHeaders'] = true;
        $this->allowHeaders = $value;

        return $this;
    }

    /**
     * @param ParamConfigurator|list<ParamConfigurator|mixed> $value
     *
     * @return $this
     */
    public function allowMethods(ParamConfigurator|array $value): static
    {
        $this->_usedProperties['allowMethods'] = true;
        $this->allowMethods = $value;

        return $this;
    }

    /**
     * @param ParamConfigurator|list<ParamConfigurator|mixed> $value
     *
     * @return $this
     */
    public function exposeHeaders(ParamConfigurator|array $value): static
    {
        $this->_usedProperties['exposeHeaders'] = true;
        $this->exposeHeaders = $value;

        return $this;
    }

    /**
     * @default 0
     * @param ParamConfigurator|mixed $value
     * @return $this
     */
    public function maxAge($value): static
    {
        $this->_usedProperties['maxAge'] = true;
        $this->maxAge = $value;

        return $this;
    }

    /**
     * @param ParamConfigurator|list<ParamConfigurator|mixed> $value
     *
     * @return $this
     */
    public function hosts(ParamConfigurator|array $value): static
    {
        $this->_usedProperties['hosts'] = true;
        $this->hosts = $value;

        return $this;
    }

    /**
     * @default false
     * @param ParamConfigurator|bool $value
     * @return $this
     */
    public function originRegex($value): static
    {
        $this->_usedProperties['originRegex'] = true;
        $this->originRegex = $value;

        return $this;
    }

    /**
     * @default null
     * @param ParamConfigurator|mixed $value
     * @return $this
     */
    public function forcedAllowOriginValue($value): static
    {
        $this->_usedProperties['forcedAllowOriginValue'] = true;
        $this->forcedAllowOriginValue = $value;

        return $this;
    }

    public function __construct(array $value = [])
    {
        if (array_key_exists('allow_credentials', $value)) {
            $this->_usedProperties['allowCredentials'] = true;
            $this->allowCredentials = $value['allow_credentials'];
            unset($value['allow_credentials']);
        }

        if (array_key_exists('allow_origin', $value)) {
            $this->_usedProperties['allowOrigin'] = true;
            $this->allowOrigin = $value['allow_origin'];
            unset($value['allow_origin']);
        }

        if (array_key_exists('allow_headers', $value)) {
            $this->_usedProperties['allowHeaders'] = true;
            $this->allowHeaders = $value['allow_headers'];
            unset($value['allow_headers']);
        }

        if (array_key_exists('allow_methods', $value)) {
            $this->_usedProperties['allowMethods'] = true;
            $this->allowMethods = $value['allow_methods'];
            unset($value['allow_methods']);
        }

        if (array_key_exists('expose_headers', $value)) {
            $this->_usedProperties['exposeHeaders'] = true;
            $this->exposeHeaders = $value['expose_headers'];
            unset($value['expose_headers']);
        }

        if (array_key_exists('max_age', $value)) {
            $this->_usedProperties['maxAge'] = true;
            $this->maxAge = $value['max_age'];
            unset($value['max_age']);
        }

        if (array_key_exists('hosts', $value)) {
            $this->_usedProperties['hosts'] = true;
            $this->hosts = $value['hosts'];
            unset($value['hosts']);
        }

        if (array_key_exists('origin_regex', $value)) {
            $this->_usedProperties['originRegex'] = true;
            $this->originRegex = $value['origin_regex'];
            unset($value['origin_regex']);
        }

        if (array_key_exists('forced_allow_origin_value', $value)) {
            $this->_usedProperties['forcedAllowOriginValue'] = true;
            $this->forcedAllowOriginValue = $value['forced_allow_origin_value'];
            unset($value['forced_allow_origin_value']);
        }

        if ([] !== $value) {
            throw new InvalidConfigurationException(sprintf('The following keys are not supported by "%s": ', __CLASS__).implode(', ', array_keys($value)));
        }
    }

    public function toArray(): array
    {
        $output = [];
        if (isset($this->_usedProperties['allowCredentials'])) {
            $output['allow_credentials'] = $this->allowCredentials;
        }
        if (isset($this->_usedProperties['allowOrigin'])) {
            $output['allow_origin'] = $this->allowOrigin;
        }
        if (isset($this->_usedProperties['allowHeaders'])) {
            $output['allow_headers'] = $this->allowHeaders;
        }
        if (isset($this->_usedProperties['allowMethods'])) {
            $output['allow_methods'] = $this->allowMethods;
        }
        if (isset($this->_usedProperties['exposeHeaders'])) {
            $output['expose_headers'] = $this->exposeHeaders;
        }
        if (isset($this->_usedProperties['maxAge'])) {
            $output['max_age'] = $this->maxAge;
        }
        if (isset($this->_usedProperties['hosts'])) {
            $output['hosts'] = $this->hosts;
        }
        if (isset($this->_usedProperties['originRegex'])) {
            $output['origin_regex'] = $this->originRegex;
        }
        if (isset($this->_usedProperties['forcedAllowOriginValue'])) {
            $output['forced_allow_origin_value'] = $this->forcedAllowOriginValue;
        }

        return $output;
    }

}
